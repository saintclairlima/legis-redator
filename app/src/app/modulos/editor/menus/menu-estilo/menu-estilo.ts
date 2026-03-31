import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-estilo',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './menu-estilo.html',
  styleUrl: './menu-estilo.css'
})
export class MenuEstilo {
  acao = output<'b' | 'i' | 'u'>();

  emitirAcao(evento: MouseEvent, comando: 'b' | 'i' | 'u') {
    evento.preventDefault(); 
    this.acao.emit(comando);
  }
}
