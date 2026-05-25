import { CommonModule, PercentPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ReferenciaElemento {
  titulo: string;
  autor: string;
  texto: string;
  score: number;
}

@Component({
  selector: 'app-bloco-referencias',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, PercentPipe],
  templateUrl: './bloco-referencias.html',
  styleUrl: './bloco-referencias.css',
})
export class BlocoReferencias {
  referencias = input.required<ReferenciaElemento[]>();
  referenciasAbertas = signal<boolean>(false);

  toggleReferencias() {
    this.referenciasAbertas.update(valorAtual => !valorAtual);
  }

  referenciasExpandidas = signal<Set<number>>(new Set());
  toggleTexto(index: number): void {
    const expandidas = new Set(this.referenciasExpandidas());
    if (expandidas.has(index)) {
      expandidas.delete(index);
    } else {
      expandidas.add(index);
    }
    this.referenciasExpandidas.set(expandidas);
  }

  getClasseBadge(porcentagem: number): string {
    if (porcentagem >= 0.75) {
      return 'bg-emerald-50 text-emerald-700';
    } else if (porcentagem >= 0.50) {
      return 'bg-orange-50 text-orange-700';
    } else {
      return 'bg-slate-100 text-slate-600';
    }
  }
  
  getRotuloRelevancia(porcentagem: number): string {
    if (porcentagem >= 0.75) return 'Alta relevância';
    if (porcentagem >= 0.50) return 'Média relevância';
    return 'Baixa relevância';
  }
}