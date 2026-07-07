import { Component, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TipoElemento } from '../../../../entidades/elemento.model';
import { AcaoOpcaoMenu } from '../../types';
import { MenuTipos } from '../menu-tipos/menu-tipos';

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

  emitirAdicionarAnotacao(){
    this.acaoSelecionada.emit({tipo: 'anotacao', valor: null});
  }

  emitirGerarReferencias(){
    this.acaoSelecionada.emit({tipo: 'referencias', valor: null});
  }
  
  emitirChecarViolacoes(){
    // this.acaoSelecionada.emit({tipo: 'violacoes', valor: null});
  }
  
  emitirRemover(){
    this.acaoSelecionada.emit({tipo: 'remover', valor: null});
  }

  toggleSubmenuTiposAberto(){
    this.submenuTiposAberto.update(valorAtual => !valorAtual);
  }

  retornarTipoSelecionado(tipoBloco: TipoElemento) {
    this.acaoSelecionada.emit({tipo: 'alterarTipo', valor: tipoBloco});
  }
}



