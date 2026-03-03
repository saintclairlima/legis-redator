import { Module } from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { ReferenciaController } from './referencia.controller';
import { ReferenciaEntity } from './entities/referencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenciaEntity])],
  exports:[TypeOrmModule],
  controllers: [ReferenciaController],
  providers: [ReferenciaService],
})
export class ReferenciaModule {}
