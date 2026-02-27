import { Module } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { ElementoController } from './elemento.controller';

@Module({
  controllers: [ElementoController],
  providers: [ElementoService],
})
export class ElementoModule {}
