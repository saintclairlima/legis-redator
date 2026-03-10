import { Controller, Get, Param } from '@nestjs/common';
import { TipoElementoService } from './tipo-elemento.service';

@Controller('tipo-elemento')
export class TipoElementoController {
  constructor(private readonly tipoElementoService: TipoElementoService) {}

  @Get()
  findAll() {
    return this.tipoElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoElementoService.findOne(+id);
  }
}
