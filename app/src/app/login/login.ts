import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { cpfValidator } from '../validators/cpf.validator';

import { MatButtonModule } from '@angular/material/button';
import { MensagemDetalhes } from '../componentes/mensagem-detalhes/mensagem-detalhes';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MensagemDetalhes, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    form = new FormGroup({
      cpf: new FormControl('', {validators: [Validators.required, cpfValidator], nonNullable: true}),
      senha: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    });

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ){ }

  exibirMensagemEsqueceuSenha = signal<boolean>(false);

  toggleExibirMensagemEsqueceuSenha() {
    this.exibirMensagemEsqueceuSenha.update(valor => !valor);
  }

  fazerLogin() {
    if (this.form.valid) {
      const cpf = this.form.controls.cpf.value;
      const senha = this.form.controls.senha.value;
      this.autenticacaoService.login(cpf, senha)
      .subscribe({
        next: (res) => {
          this.router.navigate(['inicio']);
        },
        error: (erro) => {
          console.error('Ocorreu um erro ao fazer login.', erro)
        }
      });
    }
  }
}
