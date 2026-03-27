import { Component, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuTipos } from '../menu-tipos/menu-tipos';
import { AcaoOpcaoMenu, TipoBloco } from '../../types';

@Component({
  selector: 'app-menu-acoes',
  imports: [MatIconModule, MenuTipos],
  templateUrl: './menu-acoes.html',
  styleUrl: './menu-acoes.css',
})
export class MenuAcoes {
  submenuTiposAberto = signal<boolean>(false);
  acaoSelecionada = output<AcaoOpcaoMenu>()
  fechar = output<void>();

  toggleSubmenuTiposAberto(){
    this.submenuTiposAberto.update(valorAtual => !valorAtual);
  }

  retornarTipoSelecionado(tipoBloco: TipoBloco) {
    this.acaoSelecionada.emit({tipo: 'alterarTipo', valor: tipoBloco});
  }
}



