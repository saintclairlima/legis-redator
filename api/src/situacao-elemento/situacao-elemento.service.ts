import { Injectable, NotFoundException } from '@nestjs/common';
import { SituacaoElementoEntity } from './entities/situacao-elemento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SituacaoElementoService {

  constructor(
    @InjectRepository(SituacaoElementoEntity)
    private situacaoElementoRepo: Repository<SituacaoElementoEntity>
  ) {}

  findAll(): Promise<SituacaoElementoEntity[]> {
    return this.situacaoElementoRepo.find();
  }

  async findOne(id: number): Promise<SituacaoElementoEntity> {
    try {
      return await  this.situacaoElementoRepo.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException(`Situação de Elemento ${id} não encontrada`);
    }
  }
}
