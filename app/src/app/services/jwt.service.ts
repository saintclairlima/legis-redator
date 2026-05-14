import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode'; 

@Injectable({ providedIn: 'root' })
export class JwtService {
  constructor() {}

  apagarToken() {
    localStorage.removeItem('token-jwt-legis-redator');
  }

  decodificatJWT(token: string): any {
    this.salvarToken(token);
    return jwtDecode(token);
  }

  possuiToken() {
    return !!localStorage.getItem('token-jwt-legis-redator');;
  }

  recuperarToken(): string | null {
    return localStorage.getItem('token-jwt-legis-redator');
  }

  salvarToken(token: string): void {
    localStorage.setItem('token-jwt-legis-redator', token);
  }

  tokenExpirado(): boolean {
    const token = this.recuperarToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;

      const dataExpiracao = decoded.exp * 1000;
      return Date.now() > dataExpiracao;
    } catch {
      return true;
    }
  }

  usuarioAutenticado(): boolean {
    return this.possuiToken() && !this.tokenExpirado();
  }
}