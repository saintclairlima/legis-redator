import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoEntity } from './entities/elemento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SituacaoElementoEntity } from 'src/situacao-elemento/entities/situacao-elemento.entity';

@Injectable()
export class ElementoService {

  constructor(
    @InjectRepository(ElementoEntity)
    private elementoRepo: Repository<ElementoEntity>,
  
    @InjectRepository(SituacaoElementoEntity) 
    private situacaoRepo: Repository<SituacaoElementoEntity>){}

  create(createElementoDto: CreateElementoDto): Promise<ElementoEntity> {
    const elemento = this.elementoRepo.create(createElementoDto);
    return this.elementoRepo.save(elemento);
  }

  findAll(): Promise<ElementoEntity[]> {
    return this.elementoRepo.find({
      relations: {
        tipoElemento: true,
        situacaoElemento: true,
        usuarioCriacao: { sujeito: { pessoa: true } },
        usuarioAlteracao: { sujeito: { pessoa: true } },
        proximoElemento: true,
        anotacoes: true,
        referencias: true
      }
    });
  }

  async findOne(id: number): Promise<ElementoEntity> {
    const elemento = await this.elementoRepo.findOne({
      where: { id },
      relations: {
        tipoElemento: true,
        situacaoElemento: true,
        usuarioCriacao: { sujeito: { pessoa: true } },
        usuarioAlteracao: { sujeito: { pessoa: true } },
        proximoElemento: true,
        anotacoes: true,
        referencias: true
      }
    });

    if (!elemento) {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }

    return elemento;
  }

  async update(id: number, updateElementoDto: UpdateElementoDto): Promise<ElementoEntity> {
    const elemento = await this.findOne(id);
    Object.assign(elemento, updateElementoDto);
    return this.elementoRepo.save(elemento);
  }

  async remove(id: number): Promise<ElementoEntity> {
    const elemento = await this.findOne(id);
    // AFAZER: Atualizar anotacao com o idUsuarioExclusao
    // anotacao.idUsuarioExclusao = idUsuario;
    return this.elementoRepo.softRemove(elemento);
  }
}
