import { Module } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { ElementoController } from './elemento.controller';
import { ElementoEntity } from './entities/elemento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SituacaoElementoEntity } from 'src/situacao-elemento/entities/situacao-elemento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElementoEntity, SituacaoElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [ElementoController],
  providers: [ElementoService],
})
export class ElementoModule {}
