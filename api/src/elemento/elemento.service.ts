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
        const repoTransacao = transactionalEntityManager.getRepository(ElementoEntity);

        try {
          let proximoId: number;

          if (createElementoDto.idElementoAnterior) {
            // Recupera o elemento anterior ao inserido
            const anterior = await repoTransacao.findOneByOrFail({ id: createElementoDto.idElementoAnterior });

            // guarda o próximo atual só por segurança, mas deve ser igual a createElementoDto.idElementoSeguinte
            if (anterior.idElementoSeguinte) proximoId = anterior.idElementoSeguinte;

            // remove o idElementoSeguinte temporariamente, para não dar choque com o elemento sendo inserido
            // já que idElementoSeguinte é unique
            await repoTransacao.update(anterior.id, { idElementoSeguinte: null });
          }
          
          // cria novo elemento
          const novoElemento = repoTransacao.create(createElementoDto);
          const elementoSalvo = await repoTransacao.save(novoElemento);

          if (createElementoDto.idElementoAnterior) {
            const resultado = await repoTransacao.update(
              createElementoDto.idElementoAnterior,
              { idElementoSeguinte: elementoSalvo.id },
            );

            // Opcional: Validar se o elemento anterior realmente existia
            if (resultado.affected === 0) {
              throw new Error(`Elemento anterior (id ${createElementoDto.idElementoAnterior}) não encontrado.`);
            }
          }

          return await repoTransacao.findOneOrFail({
            where: { id: elementoSalvo.id },
            relations: {
              tipoElemento: true,
              situacaoElemento: true,
              proximoElemento: true,
              referencias: true,
              anotacoes: true
            },
          });
        } catch (erro) {
          throw new InternalServerErrorException('Erro ao criar elemento', {
            cause: erro,
          });
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

  ordenarElementos(elementos: ElementoEntity[]): ElementoEntity[] {
    // AFAZER: Verificar a lógica de ordenação
    if (!elementos.length) return [];

    const mapa = new Map(elementos.map(e => [e.id, e]));
    const apontados = new Set(elementos.map(e => e.idElementoSeguinte).filter((id): id is number => id !== null));

    const resultado: ElementoEntity[] = [];
    const visitados = new Set<number>();

    let atual: ElementoEntity | undefined = elementos.find(e => !apontados.has(e.id)) ?? elementos[0];

    while (atual && !visitados.has(atual.id)) {
      visitados.add(atual.id);
      resultado.push(atual);
      atual = atual.idElementoSeguinte ? mapa.get(atual.idElementoSeguinte) : undefined;
    }
    return resultado;
  }

  async getByDocumento(idDocumento: number): Promise<ElementoEntity[]> {
    const elementos = await this.elementoRepo.find({
      where: { idDocumento },
      relations: {
        tipoElemento: true,
        situacaoElemento: true,
        proximoElemento: true,
        referencias: true,
        anotacoes: true
      },
    });

    return this.ordenarElementos(elementos);
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
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const repoTransacao = transactionalEntityManager.getRepository(ElementoEntity);

        const elemento = await repoTransacao.findOneBy({ id: idElemento });
        if (!elemento) {
          throw new NotFoundException(`Elemento com id ${idElemento} não encontrado`);
        }

        try {
          // AFAZER: considerar se faz sentido fazer softRemove, já que o elemento
          // removido vai ficar órfão, sem referências de qual elemento vinha antes e depois
          const idElementoSeguinte = elemento.idElementoSeguinte;
          elemento.idElementoSeguinte = null;
          elemento.idUsuarioExclusao = idUsuario;          
          await repoTransacao.save(elemento);
          const resultadoRemocao = await repoTransacao.softRemove(elemento);

          const elementoAnterior = await repoTransacao.findOneBy({ idElementoSeguinte: idElemento });
          if (elementoAnterior) {
            elementoAnterior.idElementoSeguinte = idElementoSeguinte;
            elementoAnterior.idUsuarioAlteracao = idUsuario;
            await repoTransacao.save(elementoAnterior);
          }

          return resultadoRemocao;

        } catch (erro) {
          console.error(`Erro fatal ao remover elemento com id ${idElemento}`, erro);
          throw new InternalServerErrorException(`Erro ao remover elemento com id ${idElemento}`, { cause: erro });
        }
      }
    );
  }
}
