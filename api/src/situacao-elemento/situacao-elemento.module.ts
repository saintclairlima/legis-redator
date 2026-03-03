import { Module } from '@nestjs/common';
import { SituacaoElementoService } from './situacao-elemento.service';
import { SituacaoElementoController } from './situacao-elemento.controller';
import { SituacaoElementoEntity } from './entities/situacao-elemento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SituacaoElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [SituacaoElementoController],
  providers: [SituacaoElementoService],
})
export class SituacaoElementoModule {}
