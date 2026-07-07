import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { ListaDtoResposta } from 'src/entidade-base/lista.dto';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { DocumentoQueryDto } from './dto/listar-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { DocumentoEntity } from './entities/documento.entity';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(DocumentoEntity)
    private documentoRepo: Repository<DocumentoEntity>,
    private dataSource: DataSource,
  ) {}

  create(createDocumentoDto: CreateDocumentoDto): Promise<DocumentoEntity> {
    const documento = this.documentoRepo.create(createDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  async findAll(
    query: DocumentoQueryDto,
  ): Promise<ListaDtoResposta<DocumentoEntity>> {
    // ✅ defaults seguros
    const busca = query.busca ?? '';
    const idSituacao = query.idSituacao ?? null;
    const page = Number.isFinite(query.page) ? query.page : 0;
    const size = Number.isFinite(query.size) ? query.size : 10;
    const sort = query.sort ?? 'numero,asc';

    // ✅ proteção sort
    const [campoRaw, direcaoRaw] = sort.split(',');

    const campo = campoRaw || 'numero';
    const direcao = direcaoRaw?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // ⚠️ whitelist (MUITO importante contra SQL injection)
    const camposPermitidos = ['numero', 'rotulo', 'dataCriacao'];
    const campoSeguro = camposPermitidos.includes(campo) ? campo : 'numero';

    // ✅ montagem dinâmica do where
    const where: FindOptionsWhere<DocumentoEntity> = {};

    if (busca) {
      where.rotulo = Like(`%${busca}%`);
    }

    if (idSituacao) {
      where.idSituacaoDocumento = idSituacao;
    }

    const resultado = await this.documentoRepo.findAndCount({
      skip: page * size,
      take: size,
      where,
      order: {
        [campoSeguro]: direcao,
      },
      relations: {
        usuarioCriacao: { pessoa: true },
        usuarioAlteracao: { pessoa: true },
        situacao: true,
        elementos: true,
        permissoes: true,
      },
    });

    return new ListaDtoResposta(resultado);
  }

  async findOne(id: number): Promise<DocumentoEntity> {
    try {
      return await this.documentoRepo.findOneOrFail({
        where: { id },
        relations: {
          usuarioCriacao: { pessoa: true },
          usuarioAlteracao: { pessoa: true },
          situacao: true,
          elementos: true,
        },
      });
    } catch {
      throw new NotFoundException(`Documento ${id} não encontrado`);
    }
  }

  async update(
    id: number,
    updateDocumentoDto: UpdateDocumentoDto,
  ): Promise<DocumentoEntity> {
    const documento = await this.findOne(id);
    Object.assign(documento, updateDocumentoDto);
    return this.documentoRepo.save(documento);
  }

  async remove(id: number, idUsuario: number): Promise<DocumentoEntity> {
    return this.dataSource.transaction(
      async (manager) => {
        const documento = await manager.findOneOrFail(DocumentoEntity, { where: { id } });

        documento.idUsuarioExclusao = idUsuario;
        await manager.save(documento);

        await manager.update(ElementoEntity, { idDocumento: id }, { idUsuarioExclusao: idUsuario });
        await manager.softDelete(ElementoEntity, { idDocumento: id });

        return manager.softRemove(documento);
      }
    );
  }
}
