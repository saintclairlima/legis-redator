import { Module } from '@nestjs/common';
import { TipoElementoService } from './tipo-elemento.service';
import { TipoElementoController } from './tipo-elemento.controller';

@Module({
  controllers: [TipoElementoController],
  providers: [TipoElementoService],
})
export class TipoElementoModule {}
