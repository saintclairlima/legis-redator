import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DadosUsuarioLogado } from './local-jwt.service';
import { Request } from 'express';
import { LocalJwtService } from './local-jwt.service';
import { SetMetadata } from '@nestjs/common';

export const E_ROTA_PUBLICA = 'isPublic';
export const Publica = () => SetMetadata(E_ROTA_PUBLICA, true);

export interface RequisicaoComUsuario extends Request {
  usuarioLogado: DadosUsuarioLogado;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(
    private tokenService: LocalJwtService,
    private reflector: Reflector
  ) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> {

    const rotaPublica = this.reflector.getAllAndOverride<boolean>(E_ROTA_PUBLICA, [
      contexto.getHandler(),
      contexto.getClass(),
    ]);

    if (rotaPublica) {
      return true;  
    }

    const requisicao = contexto.switchToHttp().getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(requisicao);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }
    
    try {
      const payload: DadosUsuarioLogado = await this.tokenService.validarToken(token);
      console.log()
      requisicao.usuarioLogado = payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
