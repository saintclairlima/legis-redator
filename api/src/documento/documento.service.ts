import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoEntity } from './entities/documento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentoService {
  
  constructor(
    @InjectRepository(DocumentoEntity)
    private documentoRepo: Repository<DocumentoEntity>){}

  create(createDocumentoDto: CreateDocumentoDto): Promise<DocumentoEntity> {
    const documento = this.documentoRepo.create(createDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  findAll(): Promise<DocumentoEntity[]> {
    return this.documentoRepo.find({
      relations: {
        usuarioCriacao: { pessoa: true},
        usuarioAlteracao: { pessoa: true },
        situacao: true,
        elementos: true,
        permissoes:  true
      }
    });
  }

  async findOne(id: number): Promise<DocumentoEntity> {
    try {
      return await this.documentoRepo.findOneOrFail({
        where: { id },
        relations: {
          usuarioCriacao: { pessoa: true },
          usuarioAlteracao: { pessoa: true },
          situacao: true,
          elementos: true
        }
      });
    } catch {
      throw new NotFoundException(`Documento ${id} não encontrado`);
    }
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<DocumentoEntity> {
    const documento = await this.findOne(id);
    Object.assign(documento, updateDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  async remove(id: number, idUsuario: number): Promise<DocumentoEntity> {  
    const documento = await this.findOne(id);
    documento.idUsuarioExclusao = idUsuario;
    await this.documentoRepo.save(documento);
    return this.documentoRepo.softRemove(documento);
  }
}
