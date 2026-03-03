import { Module } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { ElementoController } from './elemento.controller';
import { ElementoEntity } from './entities/elemento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [ElementoController],
  providers: [ElementoService],
})
export class ElementoModule {}
