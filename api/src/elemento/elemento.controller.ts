import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoEntity } from './entities/elemento.entity';
import type { RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';

@Controller('elemento')
export class ElementoController {
  constructor(private readonly elementoService: ElementoService) {}

  @Post()
  create(
    @Body() createElementoDto: CreateElementoDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<ElementoEntity> {
    const usuario = req.usuarioLogado;
    createElementoDto.idUsuarioCriacao = usuario.idUsuario;
    return this.elementoService.create(createElementoDto);
  }

  @Get()
  findAll(): Promise<ElementoEntity[]> {
    return this.elementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ElementoEntity> {
    return this.elementoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElementoDto: UpdateElementoDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<ElementoEntity> {
    const usuario = req.usuarioLogado;
    updateElementoDto.idUsuarioAlteracao = usuario.idUsuario;
    return this.elementoService.update(+id, updateElementoDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: RequisicaoComUsuario
  ): Promise<ElementoEntity> {
    const usuario = req.usuarioLogado;
    return this.elementoService.remove(+id, usuario.idUsuario);
  }
}
