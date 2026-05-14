import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { cpfValidator } from '../validators/cpf.validator';
import { MensagemDetalhes } from '../componentes/mensagem-detalhes/mensagem-detalhes';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MensagemDetalhes,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  exibirMensagemEsqueceuSenha = signal<boolean>(false);
  realizandoLogin = signal<boolean>(false);

  form = new FormGroup({
    cpf: new FormControl('', {validators: [Validators.required, cpfValidator], nonNullable: true}),
    senha: new FormControl('', {validators: [Validators.required], nonNullable: true}),
  });

  constructor(
    private autenticacaoService: AutenticacaoService,
    private snackBar: MatSnackBar,
    private router: Router
  ){ }

  toggleExibirMensagemEsqueceuSenha() {
    this.exibirMensagemEsqueceuSenha.update(valor => !valor);
  }

  fazerLogin() {
    if (this.form.valid) {
      const cpf = this.form.controls.cpf.value;
      const senha = this.form.controls.senha.value;

      this.realizandoLogin.set(true);
      this.form.disable();
      this.autenticacaoService.login(cpf, senha)
      .pipe(finalize(
        ()=> {
          this.realizandoLogin.set(false);
          this.form.enable();
        }))
      .subscribe({
        next: (res) => {
          this.router.navigate(['inicio']);
        },
        error: (erro) => {
          if (erro.status === 401) {
            this.snackBar.open('CPF ou senha inválidos.', 'Fechar', { duration: 4000 });
            return;
          }
          this.snackBar.open('Não foi possível realizar o login. Tente novamente.', 'Fechar', { duration: 4000 });
          console.error('Ocorreu um erro ao fazer login.', erro)
        }
      });
    }
  }
}
