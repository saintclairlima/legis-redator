import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity, SujeitoEntity, UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { SituacaoDocumentoEntity } from 'src/situacao-documento/entities/situacao-documento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoEntity, SituacaoDocumentoEntity]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
