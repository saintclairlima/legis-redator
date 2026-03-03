import { Module } from '@nestjs/common';
import { TipoElementoService } from './tipo-elemento.service';
import { TipoElementoController } from './tipo-elemento.controller';
import { TipoElementoEntity } from './entities/tipo-elemento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [TipoElementoController],
  providers: [TipoElementoService],
})
export class TipoElementoModule {}
