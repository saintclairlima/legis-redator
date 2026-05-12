import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  corConfirmar?: 'primary' | 'warn' | 'accent';
}

@Component({
  standalone: true,
  selector: 'app-dialogo-confirmacao',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialogo-confirmacao.html',
  styleUrl: './dialogo-confirmacao.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogoConfirmacao {
  readonly ref = inject(MatDialogRef<DialogoConfirmacao, boolean>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  get textoConfirmar(): string {
    return this.data.textoConfirmar ?? 'Confirmar';
  }

  get textoCancelar(): string {
    return this.data.textoCancelar ?? 'Cancelar';
  }

  get corConfirmar(): 'primary' | 'warn' | 'accent' {
    return this.data.corConfirmar ?? 'primary';
  }
}
