import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TipoElemento, tiposElemento } from '../../../../entidades/elemento.model';

@Component({
  selector: 'app-menu-tipos',
  imports: [MatIconModule],
  templateUrl: './menu-tipos.html',
  styleUrl: './menu-tipos.css',
})
export class MenuTipos {
  tiposElemento = tiposElemento;
  // Emite o tipo selecionado para o componente pai
  tipoSelecionado = output<TipoElemento>();
  // Emite o evento de fechar (clique no backdrop)
  fechar = output<void>();
  
  selecionarTipo(tipoBloco: TipoElemento) {
    this.tipoSelecionado.emit(tipoBloco);
  }
}
