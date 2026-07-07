import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciaEntity } from './entities/referencia.entity';
import { ReferenciaController } from './referencia.controller';
import { ReferenciaService } from './referencia.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenciaEntity])],
  exports:[TypeOrmModule],
  controllers: [ReferenciaController],
  providers: [ReferenciaService],
})
export class ReferenciaModule {}
