import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoEntity } from './entities/documento.entity';
import { Repository, UpdateResult } from 'typeorm';
import { RotuloSituacaoDocumento, SituacaoDocumentoEntity } from 'src/situacao-documento/entities/situacao-documento.entity';

@Injectable()
export class DocumentoService {
  
  constructor(
    @InjectRepository(DocumentoEntity)
    private documentoRepo: Repository<DocumentoEntity>,
  
    @InjectRepository(SituacaoDocumentoEntity) 
    private situacaoRepo: Repository<SituacaoDocumentoEntity>){}

  create(createDocumentoDto: CreateDocumentoDto): Promise<DocumentoEntity> {
    const documento = this.documentoRepo.create(createDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  findAll(): Promise<DocumentoEntity[]> {
    return this.documentoRepo.find({
      relations: {
        usuarioCriacao: { sujeito: {pessoa: true} },
        usuarioAlteracao: { sujeito: {pessoa: true} },
        situacao: true,
        elementos: true
      }
    });
  }

  findOne(id: number): Promise<DocumentoEntity> {
    const documento = this.documentoRepo.findOneOrFail({
      where: { id },
      relations: {
        usuarioCriacao: { sujeito: {pessoa: true} },
        usuarioAlteracao: { sujeito: {pessoa: true} },
        situacao: true,
        elementos: true
      }
    });
    if (!documento) {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }
    return documento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<DocumentoEntity> {
    const documento = await this.findOne(id);
    Object.assign(documento, updateDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  async remove(id: number): Promise<DocumentoEntity> {
    const documento = await this.findOne(id);
    // AFAZER: Atualizar anotacao com o idUsuarioExclusao
    // documento.idUsuarioExclusao = idUsuario;
    return this.documentoRepo.softRemove(documento);
  }
}
