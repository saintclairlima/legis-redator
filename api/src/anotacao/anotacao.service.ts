import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnotacaoDto } from './dto/create-anotacao.dto';
import { UpdateAnotacaoDto } from './dto/update-anotacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnotacaoEntity } from './entities/anotacao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnotacaoService {

  constructor(
    @InjectRepository(AnotacaoEntity)
    private anotacaoRepo: Repository<AnotacaoEntity>
  ) {}
  
  create(createAnotacaoDto: CreateAnotacaoDto): Promise<AnotacaoEntity> {
    const anotacao = this.anotacaoRepo.create(createAnotacaoDto);
    return this.anotacaoRepo.save(anotacao);
  }

  findAll(): Promise<AnotacaoEntity[]> {
    return this.anotacaoRepo.find({
      relations: { elemento: true }
    });
  }

  async findOne(id: number): Promise<AnotacaoEntity> {
    const anotacao = await this.anotacaoRepo.findOne({
      where: { id },
      relations: { elemento: true }
    });

    if (!anotacao) {
      throw new NotFoundException(`Anotação ${id} não encontrada`);
    }
    return anotacao;
  }

  async update(id: number, updateAnotacaoDto: UpdateAnotacaoDto): Promise<AnotacaoEntity> {
    const anotacao = await this.findOne(id);
    Object.assign(anotacao, updateAnotacaoDto);
    return this.anotacaoRepo.save(anotacao);
  }

  async remove(id: number) {
    const anotacao = await this.findOne(id);
    // AFAZER: Atualizar anotacao com o idUsuarioExclusao
    // anotacao.idUsuarioExclusao = idUsuario;
    return this.anotacaoRepo.softRemove(anotacao);
  }
}
