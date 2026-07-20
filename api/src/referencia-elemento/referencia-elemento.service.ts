import { Injectable } from '@nestjs/common';
import { CreateReferenciaElementoDto } from './dto/create-referencia-elemento.dto';
import { UpdateReferenciaElementoDto } from './dto/update-referencia-elemento.dto';

@Injectable()
export class ReferenciaElementoService {
  create(createReferenciaElementoDto: CreateReferenciaElementoDto) {
    return 'This action adds a new referenciaElemento';
  }

  findAll() {
    return `This action returns all referenciaElemento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referenciaElemento`;
  }

  update(id: number, updateReferenciaElementoDto: UpdateReferenciaElementoDto) {
    return `This action updates a #${id} referenciaElemento`;
  }

  remove(id: number) {
    return `This action removes a #${id} referenciaElemento`;
  }
}
