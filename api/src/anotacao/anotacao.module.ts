import { Module } from '@nestjs/common';
import { AnotacaoService } from './anotacao.service';
import { AnotacaoController } from './anotacao.controller';

@Module({
  controllers: [AnotacaoController],
  providers: [AnotacaoService],
})
export class AnotacaoModule {}
