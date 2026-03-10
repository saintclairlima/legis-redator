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
    try {
      return await this.referenciaRepo.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException(`Referência ${id} não encontrada`);
    }
  }

  async findOneComElementos(id: number): Promise<ReferenciaEntity> {
    try {
      return await this.referenciaRepo.findOneOrFail({
        where: { id },
        relations: { elementos: true }
      });
    } catch {
      throw new NotFoundException(`Referência ${id} não encontrada`);
    }
  }

  async update(id: number, updateReferenciaDto: UpdateReferenciaDto): Promise<ReferenciaEntity> {
    const referencia = await this.findOne(id);
    Object.assign(referencia, updateReferenciaDto);
    return this.referenciaRepo.save(referencia);
  }

  async remove(idAnotacao: number, idUsuario: number) {
    const anotacao = await this.findOne(idAnotacao);
    anotacao.idUsuarioExclusao = idUsuario;
    await this.referenciaRepo.save(anotacao);
    return this.referenciaRepo.softRemove(anotacao);
  }
}
