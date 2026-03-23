import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissaoDocumentoEntity } from 'src/permissao-documento/entities/permissao-documento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoEntity, PermissaoDocumentoEntity]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
