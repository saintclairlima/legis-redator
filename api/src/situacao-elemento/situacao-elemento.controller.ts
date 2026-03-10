import { Controller, Get, Param } from '@nestjs/common';
import { SituacaoElementoService } from './situacao-elemento.service';

@Controller('situacao-elemento')
export class SituacaoElementoController {
  constructor(private readonly situacaoElementoService: SituacaoElementoService) {}

  @Get()
  findAll() {
    return this.situacaoElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situacaoElementoService.findOne(+id);
  }
}
