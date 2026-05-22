import { afterNextRender, Component, ElementRef, inject, Injector, input, output, signal, viewChild } from '@angular/core';

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

  private injector = inject(Injector);

  iniciarEdicao() {
    this.editando.set(true);
    afterNextRender(() => {
      this.inputRef()?.nativeElement.focus();
    }, { injector: this.injector });
  }

  finalizarEdicao() {
    this.editando.set(false);
  }
}