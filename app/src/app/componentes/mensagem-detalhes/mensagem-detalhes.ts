import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mensagem-detalhes',
  imports: [],
  templateUrl: './mensagem-detalhes.html',
  styleUrl: './mensagem-detalhes.css',
})

export class MensagemDetalhes {
  titulo = input<string>();
  conteudo = input.required<string[]>();
  exibirMensagem = input.required<boolean>();
  tipoMensagem = input<'info' | 'aviso' | 'erro'>('info');

  constructor(){}
}
