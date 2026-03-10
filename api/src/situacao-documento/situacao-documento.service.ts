import { Injectable, NotFoundException } from '@nestjs/common';
import { SituacaoDocumentoEntity } from './entities/situacao-documento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
