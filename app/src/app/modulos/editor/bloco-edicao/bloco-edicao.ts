import { Component, computed, effect, ElementRef, HostListener, input, model, output, signal, ViewChild, WritableSignal } from '@angular/core';
import { MenuEstilo } from '../menus/menu-estilo/menu-estilo';
import { AcaoOpcaoMenu, DadosBlocoEdicao, DadosBlocoEmFoco, TipoBloco, TipoMenu } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { MenuTipos } from '../menus/menu-tipos/menu-tipos';
import { MenuAcoes } from '../menus/menu-acoes/menu-acoes';

@Component({
  selector: 'app-bloco-edicao',
  imports: [MatIconModule, MenuAcoes, MenuEstilo, MenuTipos],
  templateUrl: './bloco-edicao.html',
  styleUrl: './bloco-edicao.css',
})
export class BlocoEdicao {

  TipoMenu = TipoMenu;
  focoManual = model<boolean>();

  constructor(){
    effect(() => {
      const focoManual = this.focoManual();
      const dadosFoco = this.dadosBlocoFoco();

      if (focoManual && dadosFoco) {
        this.focar(dadosFoco.cursorNoFim ?? false);
      }
    });
  }

  ngAfterViewInit(){
    const estado = this.dadosBlocoFoco();

    if (!estado) return;
    if (estado.id !== this.dados().id) return;
    
    this.focar(estado.cursorNoFim??false);
    if (estado.mostrarMenu) {
      this.toggleMenu(TipoMenu.TIPOS);
    }
  }
  
  dadosSignal = input.required<WritableSignal<DadosBlocoEdicao>>();
  dados = computed(() => this.dadosSignal()());
  aoAlterarDadosBloco = output<DadosBlocoEdicao>();
  aoAdicionarBlocoAbaixo = output<boolean | undefined>();
  aoRemoverBloco = output();

  dadosBlocoFoco = input<DadosBlocoEmFoco | null>();
  tipoMenuAberto = signal<TipoMenu | null>(null);
  posicaoMenuEstilo = signal({ top: 0, left: 0 });

  @ViewChild('elementoEditavel')
  elementoEditavel!: ElementRef<HTMLDivElement>;

  adicionarBlocoAbaixo(mostrarMenu?: boolean) {
    this.aoAdicionarBlocoAbaixo.emit(mostrarMenu);
  }

  alterarTipoBloco(novoTipo: TipoBloco) {
    this.aoAlterarDadosBloco.emit({ ...this.dados(), tipo: novoTipo });
    this.fecharMenu();
  }

  aplicarEstiloInline(tag: 'b' | 'i' | 'u') {
    const comandos = {'b': 'bold', 'i': 'italic', 'u': 'underline'};
    const comando = comandos[tag];
    const selecao = window.getSelection();
    if (!selecao || selecao.rangeCount === 0 || selecao.isCollapsed) return;
    // Utilizado execCommand, apesar de ser deprecated, por facilitar o gerenciamento de seleção
    // e aplicação de estilos sobrepostos. Cabe considerar uma implementação robusta, não deprecated
    document.execCommand(comando, false);
    
    const range = selecao.getRangeAt(0);
    const elementoEditavel = (range.commonAncestorContainer instanceof HTMLElement 
      ? range.commonAncestorContainer 
      : range.commonAncestorContainer.parentElement)?.closest('[data-wrapper-bloco]');

    if (elementoEditavel) {
      elementoEditavel.normalize();
    }
  }

  fecharMenu() {
    this.tipoMenuAberto.set(null);
  }

  focar(noFim: boolean = false) {
    if(!this.elementoEditavel || !this.elementoEditavel.nativeElement) return;
    const elemento = this.elementoEditavel.nativeElement;
    elemento.focus();
    if (noFim) {
      const intervalo = document.createRange();
      const selecao = window.getSelection();
      intervalo.selectNodeContents(elemento);
      intervalo.collapse(false);
      selecao?.removeAllRanges();
      selecao?.addRange(intervalo);
    }
    this.focoManual.set(false)
  }

  processarResultadoMenuAcoes(acao: AcaoOpcaoMenu) {
    switch (acao.tipo) {
      case 'alterarTipo':
        this.alterarTipoBloco (acao.valor);
        break;
      case 'anotacao':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'referencias':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'violacoes':
        throw new Error ('Ação com suporte ainda não implementado.');
      case 'remover':
        this.removerBloco();
        break;
      default:
        throw new Error ('Ação com suporte ainda não implementado.');
    }
  }

  reagirTeclaPressionada(evento: KeyboardEvent) {    
    const elemento = evento.target as HTMLElement;

    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      this.adicionarBlocoAbaixo();
    }

    // O 'innerText' pode conter '\n' em campos contenteditable aparentemente vazios.
    const elementoEstaVazio = elemento.innerText.trim() === '';

    if (evento.key === 'Backspace' && elementoEstaVazio) {
      this.removerBloco();
    }
  }

  removerBloco() {
    this.aoRemoverBloco.emit();
  }

  salvarConteudo(conteudoEditado: string) {
    this.aoAlterarDadosBloco.emit({ ...this.dados(), conteudo: conteudoEditado });
  }

  toggleMenu(tipoMenu: TipoMenu) {
    this.tipoMenuAberto.update(tipoAtual => tipoAtual === tipoMenu ? null : tipoMenu);
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

    const idBloco = elementoEditavel.getAttribute('data-id');
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