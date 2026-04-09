import { Component, signal, viewChildren, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DadosBlocoEdicao, DadosBlocoEmFoco, TipoMenu } from '../types';
import { BlocoEdicao } from '../bloco-edicao/bloco-edicao';

@Component({
  selector: 'app-area-edicao',
  standalone: true,
  imports: [BlocoEdicao, CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './area-edicao.html',
  styleUrl: './area-edicao.css'
})
export class AreaEdicao implements AfterViewInit {
  blocos = signal<DadosBlocoEdicao[]>([
    this.gerarDadosBlocoVazio(),
  ]);

  dadosBlocoFoco = signal<DadosBlocoEmFoco | null>(null);
  
  idBlocoSendoArrastado = signal<string | null>(null);
  idBlocoSobreposto = signal<string | null>(null);

  idMenuAberto = signal<string | null>(null);
  tipoMenuAberto = signal<TipoMenu>(null);
  posicaoMenuEstilo = signal<{ top: number, left: number }>({ top: 0, left: 0 });

  //viewBlocos = viewChildren(BlocoEdicao);

  ngAfterViewInit() {
    this.focarBloco(this.blocos()[0].id);
  }

  private focarBloco(id: string, cursorNoFim: boolean = false, mostrarMenu: boolean = false) {
    this.dadosBlocoFoco.set({ id, cursorNoFim, mostrarMenu })
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

  aoAdicionarBlocoAbaixo(indice: number, mostrarMenu?: boolean) {
    const dadosBlocoOrigem = this.blocos()[indice];
    const idBloco = crypto.randomUUID();

    const dadosNovoBloco: DadosBlocoEdicao = {
      id: idBloco,
      tipo: dadosBlocoOrigem.tipo,
      conteudo: '',
      nivelIndentacao: dadosBlocoOrigem.nivelIndentacao
    };

    this.blocos.update(listaBlocos => {
      const listaAtualizada = [...listaBlocos];
      listaAtualizada.splice(indice + 1, 0, dadosNovoBloco);
      return listaAtualizada;
    });
    
    this.focarBloco(idBloco, true, mostrarMenu);
  }

  aoAlterarDadosBloco(idBloco: string, blocoAtualizado: DadosBlocoEdicao) {
    this.blocos.update(lista => {
      const indice = lista.findIndex(b => b.id === idBloco);
      if (indice === -1) {
        return lista; 
      }
      const listaAtualizada = [...lista];
      listaAtualizada[indice] = blocoAtualizado;
      return listaAtualizada;
    });
  }

  aoRemoverBloco(idBloco: string) {
    let indiceBlocoRemover = -1;
    this.blocos.update(lista => {
      indiceBlocoRemover = lista.findIndex(b => b.id === idBloco);    
      // se idBloco não presentae na lista
      if (indiceBlocoRemover === -1) {
        return lista; 
      }
      // Se houver somente um bloco, não remove, apenas seta ele para ficar vazio
      if (lista.length === 1) {
        return [this.gerarDadosBlocoVazio()];
      }

      const listaAtualizada = [...lista];
      listaAtualizada.splice(indiceBlocoRemover, 1);
      return listaAtualizada;
    });

    if (indiceBlocoRemover === -1) return;

    let idBlocoParaFocar;
    if (indiceBlocoRemover-1 >= 0) {
      idBlocoParaFocar = this.blocos()[indiceBlocoRemover - 1].id;
    } else {
      idBlocoParaFocar = this.blocos()[0].id;
    }
    
    this.focarBloco(idBlocoParaFocar, true, false);
  }

  gerarDadosBlocoVazio(): DadosBlocoEdicao {
    return { id: crypto.randomUUID(), tipo: 'paragraph', conteudo: '', nivelIndentacao: 0 }
  }
}
