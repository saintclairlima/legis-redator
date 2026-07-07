import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementoController } from './elemento.controller';
import { ElementoService } from './elemento.service';
import { ElementoEntity } from './entities/elemento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [ElementoController],
  providers: [ElementoService],
})
export class ElementoModule {}
