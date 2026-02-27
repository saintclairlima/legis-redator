import { Injectable } from '@nestjs/common';
import { CreateSituacaoElementoDto } from './dto/create-situacao-elemento.dto';
import { UpdateSituacaoElementoDto } from './dto/update-situacao-elemento.dto';

@Injectable()
export class SituacaoElementoService {
  create(createSituacaoElementoDto: CreateSituacaoElementoDto) {
    return 'This action adds a new situacaoElemento';
  }

  findAll() {
    return `This action returns all situacaoElemento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} situacaoElemento`;
  }

  update(id: number, updateSituacaoElementoDto: UpdateSituacaoElementoDto) {
    return `This action updates a #${id} situacaoElemento`;
  }

  remove(id: number) {
    return `This action removes a #${id} situacaoElemento`;
  }
}
