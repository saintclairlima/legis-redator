import { CommonModule, PercentPipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface ReferenciaElemento {
  titulo: string;
  autor: string;
  texto: string;
  score: number;
}

@Component({
  selector: 'app-bloco-referencias',
  standalone: true,
  imports: [CommonModule, MatIconModule, PercentPipe],
  templateUrl: './bloco-referencias.html',
  styleUrl: './bloco-referencias.css',
})
export class BlocoReferencias {
  referencias = input.required<ReferenciaElemento[]>();

  referenciasAbertas = model<boolean>(false);

  toggleReferencias() {
    this.referenciasAbertas.update(valorAtual => !valorAtual);
  }
}