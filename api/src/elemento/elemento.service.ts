import { Injectable } from '@nestjs/common';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';

@Injectable()
export class ElementoService {
  create(createElementoDto: CreateElementoDto) {
    return 'This action adds a new elemento';
  }

  findAll() {
    return `This action returns all elemento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elemento`;
  }

  update(id: number, updateElementoDto: UpdateElementoDto) {
    return `This action updates a #${id} elemento`;
  }

  remove(id: number) {
    return `This action removes a #${id} elemento`;
  }
}
