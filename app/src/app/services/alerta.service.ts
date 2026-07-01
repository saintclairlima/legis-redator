import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/internal/operators/take';
import { DialogoConfirmacao } from '../componentes/dialogo-confirmacao/dialogo-confirmacao';

interface Confirmacao{
  titulo?: string;
  mensagem?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  corConfirmar?: string;
  acaoAoConfirmar?: () => void;
}

  interface OpcoesNotificacao {
    rotuloBotao?: string;
    duracao?: number;
    estilo?: 'sucesso' | 'erro' | 'info';
  }

@Injectable({ providedIn: 'root' })
export class AlertaService {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  mostrarNotificacao( mensagem: string, opcoes: OpcoesNotificacao = {}) {
    const { rotuloBotao = 'Fechar', duracao = 4000, estilo } = opcoes;
    const classes = { sucesso: 'snackbar-sucesso', erro: 'snackbar-erro', info: 'snackbar-info' };

    this.snackBar.open(
      mensagem,
      rotuloBotao,
      {
        duration: duracao,
        ...(estilo && { panelClass: [classes[estilo]] })
      }
    );
  }
}
