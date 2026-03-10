import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoElementoEntity } from './entities/tipo-elemento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoElementoService {

  constructor(
    @InjectRepository(TipoElementoEntity)
    private tipoElementoRepo: Repository<TipoElementoEntity>
  ) {}

  findAll(): Promise<TipoElementoEntity[]> {
    return this.tipoElementoRepo.find();
  }
  

  async findOne(id: number): Promise<TipoElementoEntity> {
    try {
      return this.tipoElementoRepo.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException(`Situação de Documento ${id} não encontrada`);
    }
  }
}
