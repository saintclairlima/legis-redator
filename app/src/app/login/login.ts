import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MensagemDetalhes } from '../componentes/mensagem-detalhes/mensagem-detalhes';
import { AlertaService } from '../services/alerta.service';
import { AutenticacaoService } from '../services/autenticacao.service';
import { cpfValidator } from '../validators/cpf.validator';

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
    private router: Router,
    private alertaService: AlertaService
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
            this.alertaService.mostrarNotificacao('CPF ou senha inválidos.', { rotuloBotao: 'Fechar', duracao: 4000, estilo: 'erro' });
            return;
          }
          this.alertaService.mostrarNotificacao('Não foi possível realizar o login. Tente novamente.', { rotuloBotao: 'Fechar', duracao: 4000, estilo: 'erro' });
          console.error('Ocorreu um erro ao fazer login.', erro)
        }
      });
    }
  }
}
