import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacaoDocumentoDto } from './create-situacao-documento.dto';

export class UpdateSituacaoDocumentoDto extends PartialType(CreateSituacaoDocumentoDto) {}
