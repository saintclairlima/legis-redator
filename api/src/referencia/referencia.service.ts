import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { ReferenciaEntity } from './entities/referencia.entity';
import { gerarHashReferencia } from './hash.utils';

@Injectable()
export class ReferenciaService {

  constructor(
    @InjectRepository(ReferenciaEntity)
    private referenciaRepo: Repository<ReferenciaEntity>
  ) {}
  
  create(createReferenciaDto: CreateReferenciaDto): Promise<ReferenciaEntity> {
    const dadosReferencia: CreateReferenciaDto = {
      ...createReferenciaDto,
      ...gerarHashReferencia(createReferenciaDto.texto),
    }

    const referencia = this.referenciaRepo.create(dadosReferencia);
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
        relations: { elementosReferencia: true }
      });
    } catch {
      throw new NotFoundException(`Referência ${id} não encontrada`);
    }
  }

  async update(id: number, updateReferenciaDto: UpdateReferenciaDto): Promise<ReferenciaEntity> {
    const referencia = await this.findOne(id);
    const dadosReferencia: UpdateReferenciaDto = { ...updateReferenciaDto };
    if (dadosReferencia.texto !== undefined && dadosReferencia.texto !== referencia.texto) {
      const dadosHash = gerarHashReferencia(dadosReferencia.texto);
      Object.assign(dadosReferencia, dadosHash);
    }
    Object.assign(referencia, dadosReferencia);
    
    return this.referenciaRepo.save(referencia);
  }

  async remove(idAnotacao: number, idUsuario: number) {
    const anotacao = await this.findOne(idAnotacao);
    anotacao.idUsuarioExclusao = idUsuario;
    await this.referenciaRepo.save(anotacao);
    return this.referenciaRepo.softRemove(anotacao);
  }
}
