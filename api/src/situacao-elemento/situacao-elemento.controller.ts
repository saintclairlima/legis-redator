import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SituacaoElementoService } from './situacao-elemento.service';
import { CreateSituacaoElementoDto } from './dto/create-situacao-elemento.dto';
import { UpdateSituacaoElementoDto } from './dto/update-situacao-elemento.dto';

@Controller('situacao-elemento')
export class SituacaoElementoController {
  constructor(private readonly situacaoElementoService: SituacaoElementoService) {}

  @Post()
  create(@Body() createSituacaoElementoDto: CreateSituacaoElementoDto) {
    return this.situacaoElementoService.create(createSituacaoElementoDto);
  }

  @Get()
  findAll() {
    return this.situacaoElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situacaoElementoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSituacaoElementoDto: UpdateSituacaoElementoDto) {
    return this.situacaoElementoService.update(+id, updateSituacaoElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situacaoElementoService.remove(+id);
  }
}
