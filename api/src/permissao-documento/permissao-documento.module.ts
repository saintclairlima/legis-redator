import { Module } from '@nestjs/common';
import { PermissaoDocumentoController } from './permissao-documento.controller';
import { PermissaoDocumentoService } from './permissao-documento.service';

@Module({
  controllers: [PermissaoDocumentoController],
  providers: [PermissaoDocumentoService],
})
export class PermissaoDocumentoModule {}
