import { Directive, ElementRef, AfterViewInit, signal, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appVerificarTruncado]',
  standalone: true
})
export class VerificarTruncadoDirective implements AfterViewInit {
  @Output() alteracaoStatus = new EventEmitter<boolean>();

  constructor(private elemento: ElementRef) {}

  ngAfterViewInit() {
    const elemento = this.elemento.nativeElement;
    const estaTruncado = elemento.scrollHeight > elemento.clientHeight;
    this.alteracaoStatus.emit(estaTruncado);
  }
}