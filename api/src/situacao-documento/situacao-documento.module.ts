import { Module } from '@nestjs/common';
import { SituacaoDocumentoService } from './situacao-documento.service';
import { SituacaoDocumentoController } from './situacao-documento.controller';

@Module({
  controllers: [SituacaoDocumentoController],
  providers: [SituacaoDocumentoService],
})
export class SituacaoDocumentoModule {}
