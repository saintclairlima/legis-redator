import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AnotacaoService } from './anotacao.service';
import { CreateAnotacaoDto } from './dto/create-anotacao.dto';
import { UpdateAnotacaoDto } from './dto/update-anotacao.dto';
import { AnotacaoEntity } from './entities/anotacao.entity';
import type { RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';
@Controller('anotacao')
export class AnotacaoController {
  constructor(private readonly anotacaoService: AnotacaoService) {}

  @Post()
  create(
    @Body() createAnotacaoDto: CreateAnotacaoDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<AnotacaoEntity> {
    const usuario = req.usuarioLogado;
    createAnotacaoDto.idUsuarioCriacao = usuario.idUsuario;
    return this.anotacaoService.create(createAnotacaoDto);
  }

  @Get()
  findAll(): Promise<AnotacaoEntity[]> {
    return this.anotacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AnotacaoEntity> {
    return this.anotacaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnotacaoDto: UpdateAnotacaoDto,
    @Req() req: RequisicaoComUsuario
  ): Promise<AnotacaoEntity> {
    const usuario = req.usuarioLogado;
    updateAnotacaoDto.idUsuarioAlteracao = usuario.idUsuario;
    return this.anotacaoService.update(+id, updateAnotacaoDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: RequisicaoComUsuario
  ): Promise<AnotacaoEntity> {
    const usuario = req.usuarioLogado;
    return this.anotacaoService.remove(+id, usuario.idUsuario);
  }
}
