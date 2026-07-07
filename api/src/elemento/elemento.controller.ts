import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { type RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ElementoService } from './elemento.service';
import { ElementoEntity } from './entities/elemento.entity';

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

  @Get('documento/:id')
  getByDocumento(@Param('id') id: string): Promise<ElementoEntity[]> {
    return this.elementoService.getByDocumento(+id);
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

  @Patch('reposicionar/:id')
  reposicionar(
    @Param('id') idElementoAlvo: string,
    @Body() dadosElementoAncora: {idElementoAncora: number},
    @Req() req: RequisicaoComUsuario
  ): Promise<ElementoEntity> {
    const usuario = req.usuarioLogado;
    
    return this.elementoService.reposicionar(
      +idElementoAlvo,
      dadosElementoAncora.idElementoAncora,
      usuario.idUsuario
    );
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
