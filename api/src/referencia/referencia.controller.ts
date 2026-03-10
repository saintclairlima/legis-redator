import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { ReferenciaEntity } from './entities/referencia.entity';
import type { RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';

@Controller('referencia')
export class ReferenciaController {
  constructor(private readonly referenciaService: ReferenciaService) {}

  @Post()
  create(
    @Body() createReferenciaDto: CreateReferenciaDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<ReferenciaEntity> {
    const usuario = req.usuarioLogado;
    createReferenciaDto.idUsuarioCriacao = usuario.idUsuario;
    return this.referenciaService.create(createReferenciaDto);
  }

  @Get()
  findAll(): Promise<ReferenciaEntity[]> {
    return this.referenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReferenciaEntity> {
    return this.referenciaService.findOne(+id);
  }

  @Get(':id/children')
  findOneChildren(@Param('id') id: string): Promise<ReferenciaEntity> {
    return this.referenciaService.findOneComElementos(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenciaDto: UpdateReferenciaDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<ReferenciaEntity> {
    const usuario = req.usuarioLogado;
    updateReferenciaDto.idUsuarioAlteracao = usuario.idUsuario;
    return this.referenciaService.update(+id, updateReferenciaDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: RequisicaoComUsuario
  ): Promise<ReferenciaEntity> {
    const usuario = req.usuarioLogado;
    return this.referenciaService.remove(+id, usuario.idUsuario);
  }
}
