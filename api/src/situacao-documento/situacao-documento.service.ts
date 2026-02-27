import { Injectable } from '@nestjs/common';
import { CreateSituacaoDocumentoDto } from './dto/create-situacao-documento.dto';
import { UpdateSituacaoDocumentoDto } from './dto/update-situacao-documento.dto';

@Injectable()
export class SituacaoDocumentoService {
  create(createSituacaoDocumentoDto: CreateSituacaoDocumentoDto) {
    return 'This action adds a new situacaoDocumento';
  }

  findAll() {
    return `This action returns all situacaoDocumento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} situacaoDocumento`;
  }

  update(id: number, updateSituacaoDocumentoDto: UpdateSituacaoDocumentoDto) {
    return `This action updates a #${id} situacaoDocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} situacaoDocumento`;
  }
}
