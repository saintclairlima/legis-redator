import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoElementoService } from './tipo-elemento.service';
import { CreateTipoElementoDto } from './dto/create-tipo-elemento.dto';
import { UpdateTipoElementoDto } from './dto/update-tipo-elemento.dto';

@Controller('tipo-elemento')
export class TipoElementoController {
  constructor(private readonly tipoElementoService: TipoElementoService) {}

  @Post()
  create(@Body() createTipoElementoDto: CreateTipoElementoDto) {
    return this.tipoElementoService.create(createTipoElementoDto);
  }

  @Get()
  findAll() {
    return this.tipoElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoElementoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoElementoDto: UpdateTipoElementoDto) {
    return this.tipoElementoService.update(+id, updateTipoElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoElementoService.remove(+id);
  }
}
