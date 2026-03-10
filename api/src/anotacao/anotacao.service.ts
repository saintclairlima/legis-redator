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
    try {
      return await this.anotacaoRepo.findOneOrFail({
        where: { id },
        relations: { elemento: true }
      });
    } catch {
      throw new NotFoundException(`Anotação ${id} não encontrada`);
    }
  }

  async update(id: number, updateAnotacaoDto: UpdateAnotacaoDto): Promise<AnotacaoEntity> {
    const anotacao = await this.findOne(id);
    Object.assign(anotacao, updateAnotacaoDto);
    return this.anotacaoRepo.save(anotacao);
  }

  async remove(idAnotacao: number, idUsuario: number): Promise<AnotacaoEntity> {
    const anotacao = await this.findOne(idAnotacao);
    anotacao.idUsuarioExclusao = idUsuario;
    await this.anotacaoRepo.save(anotacao);
    return this.anotacaoRepo.softRemove(anotacao);
  }
}
