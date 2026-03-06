import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferenciaEntity } from './entities/referencia.entity';

@Injectable()
export class ReferenciaService {

  constructor(
    @InjectRepository(ReferenciaEntity)
    private referenciaRepo: Repository<ReferenciaEntity>
  ) {}
  
  create(createReferenciaDto: CreateReferenciaDto): Promise<ReferenciaEntity> {
    const referencia = this.referenciaRepo.create(createReferenciaDto);
    return this.referenciaRepo.save(referencia);
  }

  findAll(): Promise<ReferenciaEntity[]> {
    return this.referenciaRepo.find();
  }

  async findOne(id: number): Promise<ReferenciaEntity> {
    const referencia = await this.referenciaRepo.findOne({
      where: { id }
    });

    if (!referencia) {
      throw new NotFoundException(`Referência ${id} não encontrada`);
    }
    return referencia;
  }

  async findOneComElementos(id: number): Promise<ReferenciaEntity> {
    const referencia = await  this.referenciaRepo.findOne({
      where: { id }, 
      relations: { elementos: true }
    });

    if (!referencia) {
      throw new NotFoundException(`Referência ${id} não encontrada`);
    }
    return referencia;
  }

  async update(id: number, updateReferenciaDto: UpdateReferenciaDto): Promise<ReferenciaEntity> {
    const referencia = await this.findOne(id);
    Object.assign(referencia, updateReferenciaDto);
    return this.referenciaRepo.save(referencia);
  }

  async remove(id: number) {
    const anotacao = await this.findOne(id);
    // AFAZER: Atualizar anotacao com o idUsuarioExclusao
    // anotacao.idUsuarioExclusao = idUsuario;
    return this.referenciaRepo.softRemove(anotacao);
  }
}
