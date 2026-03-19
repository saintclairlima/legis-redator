import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({ providedIn: 'root' })
export class JwtService {
  constructor() {}

  decodificatJWT(token: string): any {
    this.salvarToken(token);
    return jwtDecode(token);
  }

  salvarToken(token: string): void {
    sessionStorage.setItem('token-jwt-legis-redator', token);
  }

  recuperarToken(): string | null {
    return sessionStorage.getItem('token-jwt-legis-redator');
  }

  apagarToken() {
    sessionStorage.removeItem('token-jwt-legis-redator');
  }
}