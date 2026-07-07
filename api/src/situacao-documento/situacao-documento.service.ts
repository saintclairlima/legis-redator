import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SituacaoDocumentoEntity } from './entities/situacao-documento.entity';

@Injectable()
export class SituacaoDocumentoService {

  constructor(
    @InjectRepository(SituacaoDocumentoEntity)
    private situacaoDocumentoRepo: Repository<SituacaoDocumentoEntity>
  ) {}

  findAll(): Promise<SituacaoDocumentoEntity[]> {
    return this.situacaoDocumentoRepo.find();
  }

  async findOne(id: number): Promise<SituacaoDocumentoEntity> {
    try {
      return await  this.situacaoDocumentoRepo.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException(`Situação de Documento ${id} não encontrada`);
    }
  }
}
