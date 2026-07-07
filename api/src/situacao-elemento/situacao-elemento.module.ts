import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SituacaoElementoEntity } from './entities/situacao-elemento.entity';
import { SituacaoElementoController } from './situacao-elemento.controller';
import { SituacaoElementoService } from './situacao-elemento.service';

@Module({
  imports: [TypeOrmModule.forFeature([SituacaoElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [SituacaoElementoController],
  providers: [SituacaoElementoService],
})
export class SituacaoElementoModule {}
