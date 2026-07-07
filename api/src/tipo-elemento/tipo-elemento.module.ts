import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoElementoEntity } from './entities/tipo-elemento.entity';
import { TipoElementoController } from './tipo-elemento.controller';
import { TipoElementoService } from './tipo-elemento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoElementoEntity])],
  exports:[TypeOrmModule],
  controllers: [TipoElementoController],
  providers: [TipoElementoService],
})
export class TipoElementoModule {}
