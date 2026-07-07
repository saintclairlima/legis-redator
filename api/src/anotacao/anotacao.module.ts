import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnotacaoController } from './anotacao.controller';
import { AnotacaoService } from './anotacao.service';
import { AnotacaoEntity } from './entities/anotacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnotacaoEntity])],
  exports:[TypeOrmModule],
  controllers: [AnotacaoController],
  providers: [AnotacaoService],
})
export class AnotacaoModule {}
