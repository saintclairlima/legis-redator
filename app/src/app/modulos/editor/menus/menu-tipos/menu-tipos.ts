import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TipoBloco } from '../../types';

@Component({
  selector: 'app-menu-tipos',
  imports: [MatIconModule],
  templateUrl: './menu-tipos.html',
  styleUrl: './menu-tipos.css',
})
export class MenuTipos {
  // Emite o tipo selecionado para o componente pai
  tipoSelecionado = output<TipoBloco>();
  // Emite o evento de fechar (clique no backdrop)
  fechar = output<void>();

  selecionarTipo(tipoBloco: TipoBloco) {
    this.tipoSelecionado.emit(tipoBloco);
  }
}
