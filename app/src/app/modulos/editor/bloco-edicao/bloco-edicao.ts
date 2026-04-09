import { Component, effect, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
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
  ngAfterViewInit(){
    const estado = this.dadosBlocoFoco();

    if (!estado) return;
    if (estado.id !== this.dados().id) return;
    
    this.focar(estado.cursorNoFim);
    if (estado.mostrarMenu) {
        this.toggleMenu('tipos');
    }
  }
  
  dados = input.required<DadosBlocoEdicao>();
  aoAlterarDadosBloco = output<DadosBlocoEdicao>();
  aoAdicionarBlocoAbaixo = output<boolean | undefined>();
  aoRemoverBloco = output();

  estaSendoArrastado = input<boolean>(false);
  estaSobreposto = input<boolean>(false);

  dadosBlocoFoco = input<DadosBlocoEmFoco | null>();
  tipoMenuAberto = signal<TipoMenu>(null);
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
      : range.commonAncestorContainer.parentElement)?.closest('.bloco-edicao');

    if (elementoEditavel) {
      elementoEditavel.normalize();
    }
  }
  
  // aplicarEstiloInline(tag: 'b' | 'i' | 'u') {
  //   const selecao = window.getSelection();
  //   if (!selecao || selecao.rangeCount === 0 || selecao.isCollapsed) return;

  //   const range = selecao.getRangeAt(0);
  //   const wrapper = document.createElement(tag);

  //   try {
  //     const conteudo = range.extractContents();
  //     wrapper.appendChild(conteudo);
  //     range.insertNode(wrapper);
  //     const novaRange = document.createRange();
  //     novaRange.selectNodeContents(wrapper);
  //     selecao.removeAllRanges();
  //     selecao.addRange(novaRange);
  //   } catch (e) {
  //     console.error("Erro ao aplicar estilo:", e);
  //   }
  // }

  fecharMenu() {
    this.tipoMenuAberto.set(null);
  }

  focar(noFim: boolean | null = false) {
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
    if (selecaoInvalida && this.tipoMenuAberto() === 'estilo') {
      this.fecharMenu();
    }
    if (selecaoInvalida) return;

    const range = selecao.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const elementoEditavel = (container instanceof HTMLElement ? container : container.parentElement)?.closest('.bloco-edicao');

    if (!elementoEditavel) {
      this.fecharMenu();
      return;
    }

    const idBloco = elementoEditavel.getAttribute('data-id');
    const wrapper = elementoEditavel.closest('.block-wrapper');

    if (idBloco == this.dados().id && wrapper) {
      this.tipoMenuAberto.set('estilo');

      const rectSelecao = range.getBoundingClientRect();
      const rectWrapper = wrapper.getBoundingClientRect();

      this.posicaoMenuEstilo.set({
        top: rectSelecao.top - rectWrapper.top - 8, 
        left: (rectSelecao.left - rectWrapper.left) + (rectSelecao.width / 2)
      });
    }
  }
}
