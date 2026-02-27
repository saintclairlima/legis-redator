import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';

@Controller('elemento')
export class ElementoController {
  constructor(private readonly elementoService: ElementoService) {}

  @Post()
  create(@Body() createElementoDto: CreateElementoDto) {
    return this.elementoService.create(createElementoDto);
  }

  @Get()
  findAll() {
    return this.elementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementoDto: UpdateElementoDto) {
    return this.elementoService.update(+id, updateElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementoService.remove(+id);
  }
}
