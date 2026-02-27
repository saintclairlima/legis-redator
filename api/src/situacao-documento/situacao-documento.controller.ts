import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SituacaoDocumentoService } from './situacao-documento.service';
import { CreateSituacaoDocumentoDto } from './dto/create-situacao-documento.dto';
import { UpdateSituacaoDocumentoDto } from './dto/update-situacao-documento.dto';

@Controller('situacao-documento')
export class SituacaoDocumentoController {
  constructor(private readonly situacaoDocumentoService: SituacaoDocumentoService) {}

  @Post()
  create(@Body() createSituacaoDocumentoDto: CreateSituacaoDocumentoDto) {
    return this.situacaoDocumentoService.create(createSituacaoDocumentoDto);
  }

  @Get()
  findAll() {
    return this.situacaoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situacaoDocumentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSituacaoDocumentoDto: UpdateSituacaoDocumentoDto) {
    return this.situacaoDocumentoService.update(+id, updateSituacaoDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situacaoDocumentoService.remove(+id);
  }
}
