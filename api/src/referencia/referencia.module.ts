import { Module } from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { ReferenciaController } from './referencia.controller';

@Module({
  controllers: [ReferenciaController],
  providers: [ReferenciaService],
})
export class ReferenciaModule {}
