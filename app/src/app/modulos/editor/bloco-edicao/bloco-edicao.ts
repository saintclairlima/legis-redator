import { Component, ElementRef, HostListener, input, model, output, signal, ViewChild } from '@angular/core';
import { MenuEstilo } from '../menus/menu-estilo/menu-estilo';
import { AcaoOpcaoMenu, DadosBlocoEdicao, TipoBloco, TipoMenu } from '../types';
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
  dados = model.required<DadosBlocoEdicao>();
  estaSendoArrastado = input<boolean>(false);
  estaSobreposto = input<boolean>(false);

  tipoMenuAberto = signal<TipoMenu>(null);
  posicaoMenuEstilo = signal({ top: 0, left: 0 });

  @ViewChild('elementoEditavel')
  elementoEditavel!: ElementRef<HTMLDivElement>;

  adicionarBlocoAbaixo(mostrarMenu?: boolean) {
    console.log('Adiciona bloco abaixo...');
    // AFAZER: chamar o método do pai, passando o id e a posicao??
  }

  alterarTipoBloco(novoTipo: TipoBloco) {
    this.dados.update(dadosAtuais => ({
      ...dadosAtuais,
      tipo: novoTipo
    }));
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

  focar(noFim: boolean = false) {
    const el = this.elementoEditavel.nativeElement;
    el.focus();

    if (noFim) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
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
        throw new Error ('Ação com suporte ainda não implementado.');
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

    if (evento.key === 'Tab') {
      evento.preventDefault();
      const delta = evento.shiftKey ? -1 : 1;
      const novoNivelIndentacao = Math.max(0, Math.min(3, this.dados().nivelIndentacao + delta));
      // AFAZER: alterar o nível de indentação no componente pai???
    }
  }

  removerBloco() {
    // AFAZER: Chamar método do pai para remover (passar id, posição????)
  }

  salvarConteudo(conteudoEditado: string) {
    // AFAZER: chamar o método do pai para salvar o bloco na lista de blocos
    // -- passar o conteudo e dados().id
  }

  toggleMenu(tipoMenu: TipoMenu) {
    this.tipoMenuAberto.update(tipoAtual => tipoAtual === tipoMenu ? null : tipoMenu);
  }

  @HostListener('document:selectionchange')
  verificarSelecaoTexto() {
    const selecao = window.getSelection();

    if (!selecao || selecao.rangeCount === 0 || selecao.isCollapsed) {
      this.fecharMenu();
      return;
    }

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
