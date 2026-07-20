import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciaElementoController } from './referencia-elemento.controller';
import { ReferenciaElementoEntity } from './entities/referencia-elemento.entity';
import { ReferenciaElementoService } from './referencia-elemento.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenciaElementoEntity])],
  exports: [TypeOrmModule],
  controllers: [ReferenciaElementoController],
  providers: [ReferenciaElementoService],
})
export class ReferenciaElementoModule {}
