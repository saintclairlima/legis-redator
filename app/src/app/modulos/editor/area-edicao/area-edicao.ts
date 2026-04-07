import { Component, ElementRef, signal, viewChildren, AfterViewInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MenuEstilo } from '../menus/menu-estilo/menu-estilo';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MenuTipos } from '../menus/menu-tipos/menu-tipos';
import { MenuAcoes } from '../menus/menu-acoes/menu-acoes';
import { AcaoOpcaoMenu, TipoBloco, TipoMenu } from '../types';
import { BlocoEdicao } from '../bloco-edicao/bloco-edicao';

interface BlocoDados {
  id: string;
  tipo: TipoBloco;
  conteudo: string;
  nivelIndentacao: number;
}

@Component({
  selector: 'app-area-edicao',
  standalone: true,
  imports: [BlocoEdicao, CommonModule, MatIconModule, MenuAcoes, MenuEstilo, MenuTipos],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './area-edicao.html',
  styleUrl: './area-edicao.css'
})
export class AreaEdicao implements AfterViewInit {
  blocos = signal<BlocoDados[]>([
    { id: '1', tipo: 'paragraph', conteudo: '', nivelIndentacao: 0 },
  ]);

  idBlocoSendoArrastado = signal<string | null>(null);
  idBlocoSobreposto = signal<string | null>(null);
  idMenuAberto = signal<string | null>(null);
  tipoMenuAberto = signal<TipoMenu>(null);
  posicaoMenuEstilo = signal<{ top: number, left: number }>({ top: 0, left: 0 });

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

    if (idBloco && wrapper) {
      this.idMenuAberto.set(idBloco);
      this.tipoMenuAberto.set('estilo');

      const rectSelecao = range.getBoundingClientRect();
      const rectWrapper = wrapper.getBoundingClientRect();

      this.posicaoMenuEstilo.set({
        top: rectSelecao.top - rectWrapper.top - 8, 
        left: (rectSelecao.left - rectWrapper.left) + (rectSelecao.width / 2)
      });
    }
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

  viewBlocos = viewChildren(BlocoEdicao);

  ngAfterViewInit() {
    this.focusBloco(0);
  }

  toggleMenu(id: string, tipoMenu: TipoMenu) {
    this.idMenuAberto.update(idAtual => idAtual === id ? null : id);
    this.tipoMenuAberto.update(tipoAtual => tipoAtual === tipoMenu ? null : tipoMenu);
  }

  fecharMenu() {
    this.idMenuAberto.set(null);
    this.tipoMenuAberto.set(null);
  }

  alterarTipoBloco(id: string, novoTipo: TipoBloco) {
    this.blocos.update(blocosAtual => 
      blocosAtual.map(bloco => bloco.id === id ? { ...bloco, tipo: novoTipo } : bloco)
    );
    this.fecharMenu();
  }

  processarResultadoMenuAcoes(id: string, acao: AcaoOpcaoMenu) {
    switch (acao.tipo) {
      case 'alterarTipo':
        this.alterarTipoBloco (id, acao.valor);
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

  salvarConteudo(id: string, html: string) {
    this.blocos.update(blocosAtual =>
      blocosAtual.map(bloco => bloco.id === id ? { ...bloco, conteudo: html } : bloco)
    );
  }

  // adicionarBlocoAbaixo(index: number, mostrarMenu?: boolean) {
  //   const elementos = this.viewBlocos();
  //   if (elementos[index]) {
  //     this.salvarConteudo(this.blocos()[index].id, elementos[index].nativeElement.innerHTML);
  //   }

  //   const blocoOrigem = this.blocos()[index];
  //   const idBloco = crypto.randomUUID();
  //   if (mostrarMenu) {
  //     this.toggleMenu(idBloco, 'tipos');
  //   }
  //   const novoBloco: BlocoDados = {
  //     id: idBloco,
  //     tipo: blocoOrigem.tipo,
  //     conteudo: '',
  //     nivelIndentacao: blocoOrigem.nivelIndentacao
  //   };

  //   this.blocos.update(blocosAtual => {
  //     const updated = [...blocosAtual];
  //     updated.splice(index + 1, 0, novoBloco);
  //     return updated;
  //   });

  //   setTimeout(() => this.focusBloco(index + 1), 0);
  // }

  // reagirTeclaPressionada(evento: KeyboardEvent, index: number, bloco: BlocoDados) {
  //   const elemento = evento.target as HTMLElement;

  //   if (evento.key === 'Enter' && !evento.shiftKey) {
  //     evento.preventDefault();
  //     this.adicionarBlocoAbaixo(index);
  //   }

  //   // O 'innerText' pode conter '\n' em campos contenteditable aparentemente vazios.
  //   const elementoEstaVazio = elemento.innerText.trim() === '';

  //   if (evento.key === 'Backspace' && elementoEstaVazio) {
  //     if (this.blocos().length > 1) {
  //       evento.preventDefault();

  //       // Remove do estado
  //       this.blocos.update(blocosAtual => blocosAtual.filter((_, i) => i !== index));

  //       // Gerencia o foco para o bloco anterior
  //       if (index > 0) {
  //         setTimeout(() => this.focusBloco(index - 1, true), 0);
  //       }
  //     }
  //   }

  //   if (evento.key === 'Tab') {
  //     evento.preventDefault();
  //     const delta = evento.shiftKey ? -1 : 1;
  //     const novoNivelIndentacao = Math.max(0, Math.min(3, bloco.nivelIndentacao + delta));

  //     this.blocos.update(blocosAtual =>
  //       blocosAtual.map((b, i) => i === index ? { ...b, nivelIndentacao: novoNivelIndentacao } : b)
  //     );
  //   }
  // }

  private focusBloco(index: number, noFim: boolean = false) {
    const blocos = this.viewBlocos();
    if (blocos[index]) {
      blocos[index].focar(noFim);
    }
  }

  aoIniciarArrasto(evento: DragEvent, id: string) {
    this.idBlocoSendoArrastado.set(id);
    evento.dataTransfer?.setData('text/plain', id);
  }

  aoArrastarSobre(event: DragEvent, id: string) {
    event.preventDefault();
    if (this.idBlocoSendoArrastado() !== id) this.idBlocoSobreposto.set(id);
  }

  aoSairDoArrasto() { this.idBlocoSobreposto.set(null); }
  aoFinalizarArrasto() { this.idBlocoSendoArrastado.set(null); this.idBlocoSobreposto.set(null); }

  aoSoltar(event: DragEvent, targetId: string) {
    event.preventDefault();
    const draggedId = event.dataTransfer?.getData('text/plain');
    if (!draggedId || draggedId === targetId) return;

    this.blocos.update(current => {
      const draggedIdx = current.findIndex(b => b.id === draggedId);
      const targetIdx = current.findIndex(b => b.id === targetId);
      const updated = [...current];
      const [removed] = updated.splice(draggedIdx, 1);
      updated.splice(targetIdx, 0, removed);
      return updated;
    });
    this.aoFinalizarArrasto();
  }
}
