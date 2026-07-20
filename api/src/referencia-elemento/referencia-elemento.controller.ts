import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReferenciaElementoService } from './referencia-elemento.service';
import { CreateReferenciaElementoDto } from './dto/create-referencia-elemento.dto';
import { UpdateReferenciaElementoDto } from './dto/update-referencia-elemento.dto';

@Controller('referencia-elemento')
export class ReferenciaElementoController {
  constructor(private readonly referenciaElementoService: ReferenciaElementoService) {}

  @Post()
  create(@Body() createReferenciaElementoDto: CreateReferenciaElementoDto) {
    return this.referenciaElementoService.create(createReferenciaElementoDto);
  }

  @Get()
  findAll() {
    return this.referenciaElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenciaElementoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferenciaElementoDto: UpdateReferenciaElementoDto) {
    return this.referenciaElementoService.update(+id, updateReferenciaElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenciaElementoService.remove(+id);
  }
}
