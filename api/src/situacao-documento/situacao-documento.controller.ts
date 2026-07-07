import { Controller, Get, Param } from '@nestjs/common';
import { SituacaoDocumentoEntity } from './entities/situacao-documento.entity';
import { SituacaoDocumentoService } from './situacao-documento.service';

@Controller('situacao-documento')
export class SituacaoDocumentoController {
  constructor(private readonly situacaoDocumentoService: SituacaoDocumentoService) {}

  @Get()
  findAll(): Promise<SituacaoDocumentoEntity[]> {
    return this.situacaoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SituacaoDocumentoEntity> {
    return this.situacaoDocumentoService.findOne(+id);
  }
}
