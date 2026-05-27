import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoConfirmacao } from '../componentes/dialogo-confirmacao/dialogo-confirmacao';
import { take } from 'rxjs/internal/operators/take';

interface Confirmacao{
  titulo?: string;
  mensagem?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  corConfirmar?: string;
  acaoAoConfirmar?: () => void;
}

@Injectable({ providedIn: 'root' })
export class AlertaService {

  constructor(private dialog: MatDialog, ) {}

  confirmarOperacao(confirmacao?: Confirmacao): MatDialogRef<DialogoConfirmacao, any>{
    const dados = {
      titulo: confirmacao?.titulo ?? 'Confirmar Operação',
      mensagem: confirmacao?.mensagem ?? 'Deseja confirmar esta operação?',
      textoConfirmar: confirmacao?.textoConfirmar ?? 'Confirmar',
      textoCancelar: confirmacao?.textoCancelar ?? 'Cancelar',
      corConfirmar: confirmacao?.corConfirmar ?? 'warn',
    }
    const dialog: MatDialogRef<DialogoConfirmacao> = this.dialog.open(
      DialogoConfirmacao,
      {
        disableClose: true,
        data: dados
      }
    );

    if (confirmacao?.acaoAoConfirmar) {
      dialog.afterClosed().pipe(take(1)).subscribe((confirmado: boolean) => {
        if (confirmado) {
          confirmacao.acaoAoConfirmar!();
        }
      });
    }

    return dialog;
  }
  
}
