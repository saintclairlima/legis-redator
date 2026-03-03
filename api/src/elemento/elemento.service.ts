import { Injectable } from '@nestjs/common';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoEntity } from './entities/elemento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ElementoService {

  constructor(
    @InjectRepository(ElementoEntity)
    private elementoRepo: Repository<ElementoEntity>){}

  create(createElementoDto: CreateElementoDto) {
    return 'This action adds a new elemento';
  }

  findAll() {
    return this.elementoRepo.find();
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
