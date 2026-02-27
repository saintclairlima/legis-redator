import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacaoElementoDto } from './create-situacao-elemento.dto';

export class UpdateSituacaoElementoDto extends PartialType(CreateSituacaoElementoDto) {}
