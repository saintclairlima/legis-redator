import { CommonModule } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Referencia } from '../../../entidades/referencia.model';
import { AreaBuscaReferencias } from './area-busca-referencias/area-busca-referencias';
import { CartaoReferencia } from './cartao-referencia/cartao-referencia';

@Component({
  selector: 'app-bloco-referencias',
  standalone: true,
  imports: [AreaBuscaReferencias, CartaoReferencia, CommonModule, MatIconModule],
  templateUrl: './bloco-referencias.html',
  styleUrl: './bloco-referencias.css',
})
export class BlocoReferencias {
  idElemento = input.required<number>();
  textoBase = input.required<string | undefined>();
  referencias = input.required<Referencia[]>();
  aoAtualizarReferencias = output<Referencia[]>();
  blocoReferenciasAberto = model<boolean>(false);
  referenciasExpandidas = signal<Set<number>>(new Set());
  
  adicionarReferencias(novasReferencias: Referencia[]) {
    const referenciasAtualizadas = [ ...this.referencias(), ...novasReferencias ];
    this.aoAtualizarReferencias.emit(referenciasAtualizadas);
  }

  removerReferencia(indice: number) {
    const referenciasAtualizadas = this.referencias().filter((_, i) => i !== indice);
    this.aoAtualizarReferencias.emit(referenciasAtualizadas);
  }

  toggleReferencias() {
    this.blocoReferenciasAberto.update(valorAtual => !valorAtual);
  }
}