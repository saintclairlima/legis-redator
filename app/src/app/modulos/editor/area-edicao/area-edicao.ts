import { Component, signal, viewChildren, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DadosBlocoEdicao, TipoMenu } from '../types';
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
    { id: '1', tipo: 'paragraph', conteudo: '', nivelIndentacao: 0 },
  ]);

  idBlocoSendoArrastado = signal<string | null>(null);
  idBlocoSobreposto = signal<string | null>(null);
  idMenuAberto = signal<string | null>(null);
  tipoMenuAberto = signal<TipoMenu>(null);
  posicaoMenuEstilo = signal<{ top: number, left: number }>({ top: 0, left: 0 });

  viewBlocos = viewChildren(BlocoEdicao);

  ngAfterViewInit() {
    this.focusBloco(0);
  }

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
