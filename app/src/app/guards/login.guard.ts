import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const loginGuard: CanActivateFn = () => {

  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.usuarioAutenticado()) {
    router.navigate(['inicio']);
    return false;
  }

  return true;
};