import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissaoDocumentoDto } from './create-permissao-documento.dto';

export class UpdatePermissaoDocumentoDto extends PartialType(CreatePermissaoDocumentoDto) {}
