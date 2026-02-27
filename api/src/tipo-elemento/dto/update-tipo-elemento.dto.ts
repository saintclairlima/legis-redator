import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoElementoDto } from './create-tipo-elemento.dto';

export class UpdateTipoElementoDto extends PartialType(CreateTipoElementoDto) {}
