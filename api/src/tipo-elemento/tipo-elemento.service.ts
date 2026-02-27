import { Injectable } from '@nestjs/common';
import { CreateTipoElementoDto } from './dto/create-tipo-elemento.dto';
import { UpdateTipoElementoDto } from './dto/update-tipo-elemento.dto';

@Injectable()
export class TipoElementoService {
  create(createTipoElementoDto: CreateTipoElementoDto) {
    return 'This action adds a new tipoElemento';
  }

  findAll() {
    return `This action returns all tipoElemento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoElemento`;
  }

  update(id: number, updateTipoElementoDto: UpdateTipoElementoDto) {
    return `This action updates a #${id} tipoElemento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoElemento`;
  }
}
