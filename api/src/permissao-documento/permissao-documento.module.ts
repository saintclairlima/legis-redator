import { Module } from '@nestjs/common';
import { PermissaoDocumentoService } from './permissao-documento.service';
import { PermissaoDocumentoController } from './permissao-documento.controller';

@Module({
  controllers: [PermissaoDocumentoController],
  providers: [PermissaoDocumentoService],
})
export class PermissaoDocumentoModule {}
