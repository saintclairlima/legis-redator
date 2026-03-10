import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface DadosUsuarioLogado {
  idUsuario: number;
}

@Injectable()
export class LocalJwtService {
  constructor( private jwtService: JwtService ) {}

  async criarToken(dados: DadosUsuarioLogado): Promise<string>{
    return this.jwtService.signAsync(dados);
  }

  async validarToken(token: string): Promise<DadosUsuarioLogado> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (!payload.idUsuario) {
        throw new UnauthorizedException('Payload do token incompleto');
      }
      return payload
    } catch (erro) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}