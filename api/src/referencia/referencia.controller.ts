import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';

@Controller('referencia')
export class ReferenciaController {
  constructor(private readonly referenciaService: ReferenciaService) {}

  @Post()
  create(@Body() createReferenciaDto: CreateReferenciaDto) {
    return this.referenciaService.create(createReferenciaDto);
  }

  @Get()
  findAll() {
    return this.referenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenciaService.findOne(+id);
  }

  @Get(':id/children')
  findOneChildren(@Param('id') id: string) {
    return this.referenciaService.findOneComElementos(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferenciaDto: UpdateReferenciaDto) {
    return this.referenciaService.update(+id, updateReferenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenciaService.remove(+id);
  }
}
