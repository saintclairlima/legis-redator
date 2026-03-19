import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

interface Usuario {
  idUsuario: string
}

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private usuarioLogado: Usuario | null = null;

  constructor(private jwtService: JwtService) {}
  
  criarSessao(token: string){
    this.usuarioLogado = this.jwtService.decodificatJWT(token) as Usuario;
  }

  getUsuarioLogado() {
    return this.usuarioLogado;
  }
}
