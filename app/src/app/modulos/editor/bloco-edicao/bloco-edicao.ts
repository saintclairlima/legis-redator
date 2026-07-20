import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, HostListener, input, model, output, signal, viewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Elemento, RotuloTipoElemento, TipoElemento } from '../../../entidades/elemento.model';
import { Referencia } from '../../../entidades/referencia.model';
import { ElementoService } from '../../../services/http/elemento.service';
import { BlocoReferencias } from '../bloco-referencias/bloco-referencias';
import { MenuAcoes } from '../menus/menu-acoes/menu-acoes';
import { MenuEstilo } from '../menus/menu-estilo/menu-estilo';
import { MenuTipos } from '../menus/menu-tipos/menu-tipos';
import { AcaoOpcaoMenu, DadosBlocoEmFoco, TipoMenu } from '../types';

@Component({
  selector: 'app-bloco-edicao',
  imports: [ BlocoReferencias, CommonModule, MatIconModule, MenuAcoes, MenuEstilo, MenuTipos],
  templateUrl: './bloco-edicao.html',
  //Permite acessar classes css internas de bibliotecas utilizadas (ex: tiptap)
  encapsulation: ViewEncapsulation.None,
  styleUrl: './bloco-edicao.css',
})
export class BlocoEdicao {
  dadosSignal = input.required<WritableSignal<Elemento>>();
  dadosBlocoFoco = input<DadosBlocoEmFoco | null>();
  focoManual = model<boolean>();

  aoAlterarDadosBloco = output<Elemento>();
  aoAdicionarBlocoAbaixo = output<boolean | undefined>();
  aoRemoverBloco = output();

  dados = computed(() => this.dadosSignal()());
  blocoReferenciasAberto = signal<boolean>(false);
  tipoMenuAberto = signal<TipoMenu | null>(null);
  posicaoMenuEstilo = signal({ top: 0, left: 0 });
  
  elementoEditavel = viewChild.required<ElementRef<HTMLDivElement>>('elementoEditavel');

  editorTipTap!: Editor;
  TipoMenu = TipoMenu;

  private atualizarConteudoSubject = new Subject<string>();

  constructor(
    private elementoService: ElementoService
  ){

    effect(() => {
      const focoManual = this.focoManual();
      const dadosFoco = this.dadosBlocoFoco();

      if (focoManual && dadosFoco) {
        this.focar(dadosFoco.cursorNoFim ?? false);
      }
    });
  }

  ngOnDestroy() {
    this.atualizarConteudoSubject.complete();
    this.editorTipTap?.destroy();
  }

  ngOnInit() {
    // Esperar 1 segundo para salvar o conteúdo alterado
    this.atualizarConteudoSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(conteudo => {
      this.salvarConteudo(conteudo);
    });
  }

  ngAfterViewInit(){
    //Esse bloco precisa vir primeiro para garantir que o editor seja inicializado antes de tentarmos focar ou abrir menus,
    // o que depende do editor estar pronto para refletir o estado atual do bloco.
    this.editorTipTap = new Editor({
      element: this.elementoEditavel().nativeElement,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Digite / para comandos...',
          emptyNodeClass: 'is-placeholder', // Classe que o Tiptap usa
        }),
      ],
      // Adicionamos as classes dinâmicas (h1, h2, list-item) diretamente no editor
      editorProps: {
        attributes: {
          class: this.getClassesBloco(),
          spellcheck: 'false',
        },
        // Substitui o (keydown) manual:
        handleKeyDown: (view, event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            this.adicionarBlocoAbaixo();
            return true; // Bloqueia o Enter padrão (que criaria parágrafo dentro do bloco)
          }
          if (event.key === 'Backspace' && this.editorTipTap.isEmpty) {
            this.removerBloco();
            return true;
          }
          return false;
        },
      },
      content: this.dados().texto || '',
      onUpdate: ({ editor }) => {
        // salva com delay de 1 segundo após caracter digitado
        this.atualizarConteudoSubject.next(editor.getHTML());
      },
      onBlur: ({ editor }) => {
        // em caso de blur, salva imediatamente
        this.salvarConteudo(editor.getHTML());
      }
    });

    const estado = this.dadosBlocoFoco();

    if (!estado || estado.id !== this.dados().id) return;
    
    this.focar(estado.cursorNoFim??false);
    if (estado.mostrarMenu) {
      this.toggleMenu(TipoMenu.TIPOS);
    }
  }

  adicionarBlocoAbaixo(mostrarMenu?: boolean) {
    this.aoAdicionarBlocoAbaixo.emit(mostrarMenu);
  }

  alterarTipoBloco(novoTipo: TipoElemento) {
    const blocoAtualizado = { idTipoElemento: novoTipo.id };
    this.elementoService.atualizar(this.dados().id, blocoAtualizado).subscribe(dadosAtualizados => { 
      this.aoAlterarDadosBloco.emit(dadosAtualizados);
      this.editorTipTap.setOptions({
        editorProps: {
          attributes: { class: this.getClassesBloco() }
        }
      });
    })
    this.fecharMenu();
  }

  aoAtualizarReferencias(referencias: Referencia[]) {
    const dadosAtualizados = { ...this.dados(), referencias };
    this.aoAlterarDadosBloco.emit(dadosAtualizados);
  }

  aplicarEstiloInline(tag: 'b' | 'i' | 'u') {
    if (!this.editorTipTap) return;

    const acoes = {
      'b': () => this.editorTipTap.chain().focus().toggleBold().run(),
      'i': () => this.editorTipTap.chain().focus().toggleItalic().run(),
      'u': () => this.editorTipTap.chain().focus().toggleUnderline().run()
    };

    acoes[tag]();
  }

  private getClassesBloco(): string {
    const d = this.dados();
    let classes = '';
    if (d.tipoElemento?.rotulo === RotuloTipoElemento.TITULO) classes += 'text-3xl font-bold ';
    if (d.tipoElemento?.rotulo === RotuloTipoElemento.CAPITULO) classes += 'text-2xl font-bold ';
    if (d.tipoElemento?.rotulo === RotuloTipoElemento.ALINEA || d.tipoElemento?.rotulo === RotuloTipoElemento.INCISO) classes += 'list-item ml-6 ';
    return classes;
  }

  fecharMenu() {
    this.tipoMenuAberto.set(null);
  }

  focar(noFim: boolean = false) {
    if (!this.editorTipTap) return;

    if (noFim) {
      this.editorTipTap.chain().focus('end').run();
    }else{
      this.editorTipTap.chain().focus('start').run();
    }    
    this.focoManual.set(false);
  }

  processarResultadoMenuAcoes(acao: AcaoOpcaoMenu) {
    switch (acao.tipo) {
      case 'alterarTipo':
        this.alterarTipoBloco(acao.valor);
        break;
      case 'anotacao':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'referencias':
        this.toggleReferencias();
        break;
      case 'violacoes':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'remover':
        this.removerBloco();
        break;
      default:
        throw new Error ('Ação com suporte ainda não implementado.');
    }
  }

  removerBloco() {
    this.aoRemoverBloco.emit();
  }

  salvarConteudo(conteudoEditado: string) {
    const htmlTratado = conteudoEditado.replace(/^<p>/, '').replace(/<\/p>$/, '');
    // Só salva se mudanças tiverem acontecido no conteúdo
    if (htmlTratado === this.dados().texto) {
      return; 
    }
    this.elementoService.atualizar(this.dados().id, { texto: htmlTratado }).subscribe(dadosAtualizados => {
      this.aoAlterarDadosBloco.emit(dadosAtualizados);
    });
  }

  toggleMenu(tipoMenu: TipoMenu) {
    this.tipoMenuAberto.update(tipoAtual => tipoAtual === tipoMenu ? null : tipoMenu);
  }

  toggleReferencias() {
    this.blocoReferenciasAberto.update(valor => !valor);
    this.fecharMenu();
  }

  @HostListener('document:selectionchange')
  verificarSelecaoTexto() {
    const selecao = window.getSelection();

    const selecaoInvalida = !selecao || selecao.rangeCount === 0 || selecao.isCollapsed;
    if (selecaoInvalida && this.tipoMenuAberto() === TipoMenu.ESTILO) {
      this.fecharMenu();
    }
    if (selecaoInvalida) return;

    const range = selecao.getRangeAt(0);
    const container = range.commonAncestorContainer;

    const elementoReferencia = this.elementoEditavel();
    const elementoEditavel = elementoReferencia?.nativeElement.contains(container) ? elementoReferencia.nativeElement : null;

    if (!elementoEditavel) {
      this.fecharMenu();
      return;
    }

    const idBloco = Number(elementoEditavel.getAttribute('data-id'));
    const wrapper = elementoEditavel.closest('[data-wrapper-bloco]');

    if (idBloco == this.dados().id && wrapper) {
      this.tipoMenuAberto.set(TipoMenu.ESTILO);

      const rectSelecao = range.getBoundingClientRect();
      const rectWrapper = wrapper.getBoundingClientRect();

      this.posicaoMenuEstilo.set({
        top: rectSelecao.top - rectWrapper.top - 8, 
        left: (rectSelecao.left - rectWrapper.left) + (rectSelecao.width / 2)
      });
    }
  }
}