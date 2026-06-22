import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoEntity } from './entities/elemento.entity';

@Injectable()
export class ElementoService {
  constructor(
    @InjectRepository(ElementoEntity)
    private elementoRepo: Repository<ElementoEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createElementoDto: CreateElementoDto): Promise<ElementoEntity> {
    return await this.dataSource.transaction(
      async (manager) => {
        // Obter o repository ligado a ESTA transação específica
        const repoTransacao = manager.getRepository(ElementoEntity);

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
              elementoSeguinte: true,
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
        elementoSeguinte: true,
        anotacoes: true,
        referencias: true,
      },
    });
  }

  ordenarElementos(elementos: ElementoEntity[]): ElementoEntity[] {
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
        elementoSeguinte: true,
        referencias: true,
        anotacoes: true
      },
    });

    return this.ordenarElementos(elementos);
  }

  async findOne(id: number, incluirRelations: boolean=true): Promise<ElementoEntity> {
    try {
      return await this.elementoRepo.findOneOrFail({
        where: { id },
        relations: incluirRelations
        ? {
            tipoElemento: true,
            situacaoElemento: true,
            usuarioCriacao: { pessoa: true },
            usuarioAlteracao: { pessoa: true },
            elementoSeguinte: true,
            anotacoes: true,
            referencias: true,
          }
        : undefined,
      });
    } catch {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }
  }

  async update(
    id: number,
    updateElementoDto: UpdateElementoDto,
  ): Promise<ElementoEntity> {
    const dadosParaAtualizar: Partial<ElementoEntity> = { ...updateElementoDto };
    const resultado = await this.elementoRepo.update(id, dadosParaAtualizar);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`Elemento ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  async reposicionar(
    idAlvo: number, 
    idAncora: number, 
    idUsuario: number
  ): Promise<ElementoEntity> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(ElementoEntity);
      
      const alvo = await repo.findOneBy({ id: idAlvo });
      const ancora = await repo.findOneBy({ id: idAncora });

      if (!alvo || !ancora) {
        throw new NotFoundException('Um ou ambos os elementos não foram encontrados.');
      }

      if (alvo.id === ancora.id) {
        return alvo;
      }
      
      const anteriorAlvo = await repo.findOneBy({ idElementoSeguinte: alvo.id });
      const anteriorAncora = await repo.findOneBy({ idElementoSeguinte: ancora.id });
      const proximoAlvo = alvo.idElementoSeguinte;

      alvo.idElementoSeguinte = null;
      await repo.save(alvo);

      if (anteriorAlvo) {
        anteriorAlvo.idElementoSeguinte = proximoAlvo;
        anteriorAlvo.idUsuarioAlteracao = idUsuario;
        await repo.save(anteriorAlvo);
      }

      if (anteriorAncora) {
        anteriorAncora.idElementoSeguinte = alvo.id;
        anteriorAncora.idUsuarioAlteracao = idUsuario;
        await repo.save(anteriorAncora);
      }

      alvo.idElementoSeguinte = ancora.id;
      alvo.idUsuarioAlteracao = idUsuario;
      return repo.save(alvo);
    });
  }

  async remove(idElemento: number, idUsuario: number): Promise<ElementoEntity> {
    return await this.dataSource.transaction(
      async (manager) => {
        const repoTransacao = manager.getRepository(ElementoEntity);

        const elemento = await repoTransacao.findOneBy({ id: idElemento });
        if (!elemento) {
          throw new NotFoundException(`Elemento com id ${idElemento} não encontrado`);
        }

        try {
          const idElementoSeguinte = elemento.idElementoSeguinte;
          elemento.idElementoSeguinte = null;
          elemento.idUsuarioExclusao = idUsuario;
          await repoTransacao.save(elemento);

          const elementoAnterior = await repoTransacao.findOneBy({ idElementoSeguinte: idElemento });
          if (elementoAnterior) {
            elementoAnterior.idElementoSeguinte = idElementoSeguinte;
            elementoAnterior.idUsuarioAlteracao = idUsuario;
            await repoTransacao.save(elementoAnterior);
          }
          
          const resultadoRemocao = await repoTransacao.remove(elemento);

          return resultadoRemocao;

        } catch (erro) {
          console.error(`Erro fatal ao remover elemento com id ${idElemento}`, erro);
          throw new InternalServerErrorException(`Erro ao remover elemento com id ${idElemento}`, { cause: erro });
        }
      }
    );
  }
}
