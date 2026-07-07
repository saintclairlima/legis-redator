import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissaoDocumentoEntity } from 'src/permissao-documento/entities/permissao-documento.entity';
import { DocumentoController } from './documento.controller';
import { DocumentoService } from './documento.service';
import { DocumentoEntity } from './entities/documento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoEntity, PermissaoDocumentoEntity]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
