import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoEntity]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
