import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createElementoDto: CreateElementoDto): Promise<ElementoEntity> {
    const elemento = this.elementoRepo.create(createElementoDto);
    return this.elementoRepo.save(elemento);
  }

  findAll(): Promise<ElementoEntity[]> {
    return this.elementoRepo.find({
      relations: {
        tipoElemento: true,
        situacaoElemento: true,
        usuarioCriacao: { pessoa: true },
        usuarioAlteracao: { pessoa: true },
        proximoElemento: true,
        anotacoes: true,
        referencias: true
      }
    });
  }

  async findOne(id: number): Promise<ElementoEntity> {
    try {
      return await this.elementoRepo.findOneOrFail({
        where: { id },
        relations: {
          tipoElemento: true,
          situacaoElemento: true,
          usuarioCriacao: { pessoa: true },
          usuarioAlteracao: { pessoa: true },
          proximoElemento: true,
          anotacoes: true,
          referencias: true
        }
      });
    } catch {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }
  }

  async update(id: number, updateElementoDto: UpdateElementoDto): Promise<ElementoEntity> {
    const elemento = await this.findOne(id);
    Object.assign(elemento, updateElementoDto);
    return this.elementoRepo.save(elemento);
  }

  async remove(idElemento: number, idUsuario: number): Promise<ElementoEntity> {
    const elemento = await this.findOne(idElemento);
    elemento.idUsuarioExclusao = idUsuario;
    await this.elementoRepo.save(elemento);
    return this.elementoRepo.softRemove(elemento);
  }
}
