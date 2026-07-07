import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SituacaoElementoEntity } from './entities/situacao-elemento.entity';

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
