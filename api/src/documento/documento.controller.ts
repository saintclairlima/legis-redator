import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import type { RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { DocumentoQueryDto } from './dto/listar-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { DocumentoEntity } from './entities/documento.entity';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  create(
    @Body() createDocumentoDto: CreateDocumentoDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<DocumentoEntity> {
    const usuario = req.usuarioLogado;
    createDocumentoDto.idUsuarioCriacao = usuario.idUsuario;
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  findAll(@Query() query: DocumentoQueryDto) {
    return this.documentoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DocumentoEntity> {
    return this.documentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: RequisicaoComUsuario,
    @Body() updateDocumentoDto: UpdateDocumentoDto
  ): Promise<DocumentoEntity> {
    const usuario = req.usuarioLogado;
    updateDocumentoDto.idUsuarioAlteracao =  usuario.idUsuario;
    return this.documentoService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
    remove(
      @Param('id') id: string,
      @Req() req: RequisicaoComUsuario
    ): Promise<DocumentoEntity> {
      const usuario = req.usuarioLogado;
      return this.documentoService.remove(+id, usuario.idUsuario);
    }
  }
