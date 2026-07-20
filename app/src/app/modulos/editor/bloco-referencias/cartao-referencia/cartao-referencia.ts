import { NgClass, PercentPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Referencia } from '../../../../entidades/referencia.model';
import { AlertaService } from '../../../../services/alerta.service';
import { ApiIaService } from '../../../../services/api-ia.service';
import { VerificarTruncadoDirective } from './verificar-truncate.directive';

@Component({
  selector: 'app-cartao-referencia',
  standalone: true,
  imports: [NgClass, PercentPipe, MatIconModule, MatTooltipModule, VerificarTruncadoDirective],
  templateUrl: './cartao-referencia.html',
  styleUrl: './cartao-referencia.css',
})
export class CartaoReferencia {
  referencia = input.required<Referencia>();
  contexto = input.required<'referencias' | 'resultadosBusca'>();
  aoAceitar = output<void>();
  aoRejeitar = output<void>();
  estaExpandido = signal<boolean>(false);
  conteudoCopiado = signal<boolean>(false);
  exibirBotaoExpandir = signal<boolean>(false);

  constructor(
    private alertaService: AlertaService,
    private apiIaService: ApiIaService
  ) {}

  aceitar() {
    this.aoAceitar.emit();
  }

  aoMudarTruncamento(estaTruncado: boolean) {
    this.exibirBotaoExpandir.set(estaTruncado);
  }

  urlDocumentoInteiro() {
    const metadados = JSON.parse(this.referencia().metadados);
    const urlDocumento = this.apiIaService.getUrlDocumento(metadados['fonte']);
    return urlDocumento;
  }

  async copiarConteudoAreaTransferencia (): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.referencia().texto);
      this.conteudoCopiado.set(true);
      setTimeout(() => { this.conteudoCopiado.set(false); }, 2000);
      return;
    } catch (erro) {
      this.alertaService.mostrarNotificacao('Seu navegador não tem suporte à função de copiar conteúdo de referência', { duracao: 2000 });
      console.error(erro);
    }
  }

  rejeitar() {
    this.aoRejeitar.emit();
  }

  toggleTexto() {
    this.estaExpandido.update(estadoAtual => !estadoAtual);
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