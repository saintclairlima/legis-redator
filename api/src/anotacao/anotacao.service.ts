import { Injectable } from '@nestjs/common';
import { CreateAnotacaoDto } from './dto/create-anotacao.dto';
import { UpdateAnotacaoDto } from './dto/update-anotacao.dto';

@Injectable()
export class AnotacaoService {
  create(createAnotacaoDto: CreateAnotacaoDto) {
    return 'This action adds a new anotacao';
  }

  findAll() {
    return `This action returns all anotacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anotacao`;
  }

  update(id: number, updateAnotacaoDto: UpdateAnotacaoDto) {
    return `This action updates a #${id} anotacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} anotacao`;
  }
}
