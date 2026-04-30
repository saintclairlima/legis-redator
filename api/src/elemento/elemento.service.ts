import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoEntity } from './entities/elemento.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ElementoService {
  constructor(
    @InjectRepository(ElementoEntity)
    private elementoRepo: Repository<ElementoEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createElementoDto: CreateElementoDto): Promise<ElementoEntity> {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        // Obter o repository ligado a ESTA transação específica
        const elementoRepo =
          transactionalEntityManager.getRepository(ElementoEntity);

        try {
          // 1. Criar e salvar o novo elemento
          const novoElemento = elementoRepo.create(createElementoDto);
          const elementoSalvo = await elementoRepo.save(novoElemento);

          // 2. Atualizar o elemento anterior, se existir
          if (createElementoDto.idElementoAnterior) {
            const resultado = await elementoRepo.update(
              createElementoDto.idElementoAnterior,
              { idElementoSeguinte: elementoSalvo.id },
            );

            // Opcional: Validar se o elemento anterior realmente existia
            if (resultado.affected === 0) {
              throw new Error('Elemento anterior não encontrado.');
            }
          }

          return await elementoRepo.findOneOrFail({
            where: { id: elementoSalvo.id },
            relations: ['tipoElemento', 'situacaoElemento'],
          });
        } catch {
          // Qualquer erro lançado aqui dentro fará o TypeORM executar o ROLLBACK automaticamente
          throw new InternalServerErrorException('Erro ao criar elemento');
        }
      },
    );
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
        referencias: true,
      },
    });
  }

  async getByDocumento(idDocumento: number): Promise<ElementoEntity[]> {
    return await this.elementoRepo.find({
      where: { idDocumento },
      relations: {
        tipoElemento: true,
        situacaoElemento: true,
        proximoElemento: true,
      },
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
          referencias: true,
        },
      });
    } catch {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }
  }

  async update(
    id: number,
    updateElementoDto: UpdateElementoDto,
  ): Promise<ElementoEntity> {
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
