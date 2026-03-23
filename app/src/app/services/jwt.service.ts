import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({ providedIn: 'root' })
export class JwtService {
  constructor() {}

  apagarToken() {
    sessionStorage.removeItem('token-jwt-legis-redator');
  }

  decodificatJWT(token: string): any {
    this.salvarToken(token);
    return jwtDecode(token);
  }

  possuiToken() {
    return !!sessionStorage.getItem('token-jwt-legis-redator');;
  }

  recuperarToken(): string | null {
    return sessionStorage.getItem('token-jwt-legis-redator');
  }

  salvarToken(token: string): void {
    sessionStorage.setItem('token-jwt-legis-redator', token);
  }
}