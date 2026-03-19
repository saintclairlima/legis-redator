import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SessaoService } from './sessao.service';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {

  constructor (
    private apiService: ApiService,
    private sessaoService: SessaoService
  ) {}

  login(login: string, senha: string) {
    return this.apiService.post('autenticacao', { login, senha })
    .pipe(
      map((resposta) => {
        if (!resposta || !resposta['access_token']) {
          // AFAZER: consertar mensagem de erro
          throw new Error('Erro no processo de autenticação.')
        }
        return resposta;
      }),
      tap((resposta) => {
        if (resposta['access_token']) {
          this.sessaoService.criarSessao(resposta['access_token']);
        }     
      })
    );
  }
}
