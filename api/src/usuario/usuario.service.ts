import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepo: Repository<UsuarioEntity>){}

  findAll() {
    return this.usuarioRepo.find({
      relations: { pessoa: true }
    });
  }

  findOne(id: number) {
    return this.usuarioRepo.findOne({
      where: { id },
      relations: { pessoa: true }
    });
  }

  findOnePorLogin(login: string) {
    return this.usuarioRepo.findOne({
      select: {
        id: true,
        idPessoa: true,
        login: true,
        senha: true,
      },
      relations: { pessoa: true },
      where: { login }
    });
  }
}
