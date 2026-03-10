import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoDto } from './dto/autenticacao.dto';
import { HashService } from 'src/util/hash.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { DadosUsuarioLogado, LocalJwtService } from './local-jwt.service';

@Injectable()
export class AutenticacaoService {
  constructor (
    private usuarioService: UsuarioService,
    private hashService: HashService,
    private tokenService: LocalJwtService,
  ){}

  async login(dadosAutenticacao: AutenticacaoDto) {
    const usuario = await this.usuarioService.findOnePorLogin(dadosAutenticacao.login);
    if (!usuario || !(await this.verificarSenha(usuario, dadosAutenticacao))) {
      throw new UnauthorizedException({ message:'Login ou senha incorretos' }, 'Login ou senha incorretos');
    }
    const payload: DadosUsuarioLogado = { idUsuario: usuario.id };
    return { access_token: await this.tokenService.criarToken(payload) };
  }

  async verificarSenha(usuario: UsuarioEntity, dadosAutenticacao: AutenticacaoDto): Promise<boolean> {
    return await this.hashService.compararHash(dadosAutenticacao.senha, usuario.senha?.replace('$2y$', '$2b$'));
  }
}
