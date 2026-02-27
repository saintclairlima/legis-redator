import { Module } from '@nestjs/common';
import { SituacaoElementoService } from './situacao-elemento.service';
import { SituacaoElementoController } from './situacao-elemento.controller';

@Module({
  controllers: [SituacaoElementoController],
  providers: [SituacaoElementoService],
})
export class SituacaoElementoModule {}
