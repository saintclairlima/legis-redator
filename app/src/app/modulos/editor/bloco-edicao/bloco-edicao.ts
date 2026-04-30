import { Component, computed, effect, ElementRef, HostListener, input, model, output, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MenuEstilo } from '../menus/menu-estilo/menu-estilo';
import { AcaoOpcaoMenu, DadosBlocoEmFoco, TipoMenu } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { MenuTipos } from '../menus/menu-tipos/menu-tipos';
import { MenuAcoes } from '../menus/menu-acoes/menu-acoes';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Elemento, RotuloTipoElemento, TipoElemento } from '../../../entidades/elemento.model';
import { ElementoService } from '../../../services/http/elemento.service';
import { ApiIaService } from '../../../services/api-ia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bloco-edicao',
  imports: [CommonModule, MatIconModule, MenuAcoes, MenuEstilo, MenuTipos],
  templateUrl: './bloco-edicao.html',
  //Permite acessar classes css internas de bibliotecas utilizadas (ex: tiptap)
  encapsulation: ViewEncapsulation.None,
  styleUrl: './bloco-edicao.css',
})
export class BlocoEdicao {
  dadosSignal = input.required<WritableSignal<Elemento>>();
  dados = computed(() => this.dadosSignal()());
  aoAlterarDadosBloco = output<Elemento>();
  aoAdicionarBlocoAbaixo = output<boolean | undefined>();
  aoRemoverBloco = output();

  dadosBlocoFoco = input<DadosBlocoEmFoco | null>();
  tipoMenuAberto = signal<TipoMenu | null>(null);
  referenciasAbertas = signal<boolean>(false);
  posicaoMenuEstilo = signal({ top: 0, left: 0 });

  @ViewChild('elementoEditavel', {static: true})
  elementoEditavel!: ElementRef<HTMLDivElement>;

  editor!: Editor;

  TipoMenu = TipoMenu;
  focoManual = model<boolean>();

  constructor(
    private elementoService: ElementoService,
    private iaService: ApiIaService,
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
    this.editor?.destroy();
  }

  ngAfterViewInit(){
    //Esse bloco precisa vir primeiro para garantir que o editor seja inicializado antes de tentarmos focar ou abrir menus,
    // o que depende do editor estar pronto para refletir o estado atual do bloco.
    this.editor = new Editor({
      element: this.elementoEditavel.nativeElement,
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
          if (event.key === 'Backspace' && this.editor.isEmpty) {
            this.removerBloco();
            return true;
          }
          return false;
        },
      },
      content: this.dados().texto || '',
      onUpdate: ({ editor }) => {
        this.salvarConteudo(editor.getHTML());
      },
      onBlur: ({ editor }) => {
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
    const blocoAtualizado = { id: this.dados().id, tipoElemento: novoTipo };
    this.elementoService.atualizar(blocoAtualizado.id, blocoAtualizado).subscribe(dadosAtualizados => { 
      this.aoAlterarDadosBloco.emit(dadosAtualizados);
      this.editor.setOptions({
        editorProps: {
          attributes: { class: this.getClassesBloco() }
        }
      });
    })
    this.fecharMenu();
  }

  aplicarEstiloInline(tag: 'b' | 'i' | 'u') {
    if (!this.editor) return;

    const acoes = {
      'b': () => this.editor.chain().focus().toggleBold().run(),
      'i': () => this.editor.chain().focus().toggleItalic().run(),
      'u': () => this.editor.chain().focus().toggleUnderline().run()
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
    if (!this.editor) return;

    if (noFim) {
      this.editor.chain().focus('end').run();
    }else{
      this.editor.chain().focus('start').run();
    }    
    this.focoManual.set(false);
  }

  gerarReferencias() {
    if(!this.dados().texto) return
    this.iaService.getReferencias(this.dados().texto!)
    .subscribe({
      next: (resposta) => {
        const dadosAtuais = this.dados();
        dadosAtuais.referencias = resposta;
        this.aoAlterarDadosBloco.emit(dadosAtuais);
      },
      error: (erro) => console.error(erro),
    });
    this.fecharMenu();
  }

  processarResultadoMenuAcoes(acao: AcaoOpcaoMenu) {
    switch (acao.tipo) {
      case 'alterarTipo':
        this.alterarTipoBloco(acao.valor);
        break;
      case 'anotacao':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'referencias':
        this.gerarReferencias();
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
    this.elementoService.atualizar(this.dados().id, { texto: conteudoEditado }).subscribe(dadosAtualizados => {
      this.aoAlterarDadosBloco.emit(dadosAtualizados);
    });
  }

  toggleMenu(tipoMenu: TipoMenu) {
    this.tipoMenuAberto.update(tipoAtual => tipoAtual === tipoMenu ? null : tipoMenu);
  }

  toggleReferencias() {
    this.referenciasAbertas.update(valorAtual => !valorAtual);
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

    const elementoEditavel = this.elementoEditavel?.nativeElement.contains(container) ? this.elementoEditavel.nativeElement : null;

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