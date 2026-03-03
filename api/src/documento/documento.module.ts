import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { DocumentoEntity } from './entities/documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity, SujeitoEntity, UsuarioEntity } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([DocumentoEntity, UsuarioEntity, SujeitoEntity, PessoaEntity]),
    TypeOrmModule.forFeature([DocumentoEntity]),
    TypeOrmModule.forFeature([UsuarioEntity, SujeitoEntity, PessoaEntity], 'portal-servidor'),
  ],
  exports:[TypeOrmModule],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
