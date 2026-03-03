import { Injectable } from '@nestjs/common';
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

  create(createDocumentoDto: CreateDocumentoDto) {
    return 'This action adds a new documento';
  }

  findAll() {
    return this.documentoRepo.find({
      relations: { usuarioCriacao: { sujeito: {pessoa: true} } }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
