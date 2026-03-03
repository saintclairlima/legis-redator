import { Module } from '@nestjs/common';
import { AnotacaoService } from './anotacao.service';
import { AnotacaoController } from './anotacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnotacaoEntity } from './entities/anotacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnotacaoEntity])],
  exports:[TypeOrmModule],
  controllers: [AnotacaoController],
  providers: [AnotacaoService],
})
export class AnotacaoModule {}
