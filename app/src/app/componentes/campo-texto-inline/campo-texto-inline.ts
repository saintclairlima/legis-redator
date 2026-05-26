import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-campo-texto-inline',
  imports: [],
  templateUrl: './campo-texto-inline.html',
  styleUrl: './campo-texto-inline.css',
})
export class CampoTextoInline {
  valor = input<string>('');
  valorChange = output<string>();
  multilinha = input(false);
  editando = signal(false);
  inputRef = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');

  constructor() {
    effect(() => {
      const editando = this.editando();
      if(editando){
        this.inputRef()?.nativeElement.focus();
      }
    })
  }

  iniciarEdicao() {
    this.editando.set(true);
  }

  finalizarEdicao() {
    this.editando.set(false);
  }
}