import { Component, signal, ChangeDetectionStrategy, model, ElementRef, QueryList, ViewChildren, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DadosBlocoEdicao, DadosBlocoEmFoco } from '../types';
import { BlocoEdicao } from '../bloco-edicao/bloco-edicao';

@Component({
  selector: 'app-area-edicao',
  standalone: true,
  imports: [BlocoEdicao, CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './area-edicao.html',
  styleUrl: './area-edicao.css'
})
export class AreaEdicao {

  blocos = signal<WritableSignal<DadosBlocoEdicao>[]>(
    [this.gerarDadosBlocoVazio()].map(d => signal(d))
  );

  @ViewChildren('wrapperBloco') blocosHtml!: QueryList<ElementRef<HTMLElement>>;

  dadosBlocoFoco = signal<DadosBlocoEmFoco | null>(null);
  focoManual = model<boolean>(false);
  idBlocoSendoArrastado = signal<string | null>(null);
  idBlocoSobreposto = signal<string | null>(null);

  constructor(){
    this.focarBloco(this.blocos()[0]().id);
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
      const draggedIdx = current.findIndex(b => b().id === draggedId);
      const targetIdx = current.findIndex(b => b().id === targetId);
      const listaAtualizada = [...current];
      const [removed] = listaAtualizada.splice(draggedIdx, 1);
      listaAtualizada.splice(targetIdx, 0, removed);
      return listaAtualizada;
    });
    this.aoFinalizarArrasto();
  }

  private focarBloco(id: string, cursorNoFim: boolean = false, mostrarMenu: boolean = false) {
    this.dadosBlocoFoco.set({ id, cursorNoFim, mostrarMenu })
    this.focoManual.set(true);
  }

  desativarFocoManual(){
    this.focoManual.set(false);
    this.dadosBlocoFoco.set(null);
  }

  aoAdicionarBlocoAbaixo(indice: number, mostrarMenu?: boolean) {
    const dadosBlocoOrigem = this.blocos()[indice]();
    const idBloco = crypto.randomUUID();

    const novoSignal = signal<DadosBlocoEdicao>({
      id: idBloco,
      tipo: dadosBlocoOrigem.tipo,
      conteudo: '',
      nivelIndentacao: dadosBlocoOrigem.nivelIndentacao
    });

    this.blocos.update(listaBlocos => {
      const listaAtualizada = [...listaBlocos];
      listaAtualizada.splice(indice + 1, 0, novoSignal);
      return listaAtualizada;
    });
    
    this.focarBloco(idBloco, true, mostrarMenu);
  }

  aoAlterarDadosBloco(idBloco: string, blocoAtualizado: DadosBlocoEdicao) {
    const indice = this.blocos().findIndex(signalBloco => signalBloco().id === idBloco);
    if (indice === -1) {
      return; 
    }
    this.blocos()[indice].set(blocoAtualizado);
  }

  aoRemoverBloco(idBloco: string) {
    let indiceRemover = this.blocos().findIndex(b => b().id === idBloco);
    
    if (indiceRemover === -1) return;

    // Se houver somente um bloco, não remove, apenas seta ele para ficar vazio
    if (this.blocos().length === 1) {
      this.blocos()[0].set(this.gerarDadosBlocoVazio());
    } else {
      this.blocos.update(lista => {
        const nova = [...lista];
        nova.splice(indiceRemover, 1);
        return nova;
      });
    }

    const proximoIndice = Math.max(0, indiceRemover - 1);
    this.focarBloco(this.blocos()[proximoIndice]().id, true, false);
  }

  gerarDadosBlocoVazio(): DadosBlocoEdicao {
    return { id: crypto.randomUUID(), tipo: 'paragraph', conteudo: '', nivelIndentacao: 0 }
  }
}