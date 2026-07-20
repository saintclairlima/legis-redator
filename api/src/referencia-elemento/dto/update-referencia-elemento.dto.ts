import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateReferenciaElementoDto } from './create-referencia-elemento.dto';

export class UpdateReferenciaElementoDto extends PartialType(CreateReferenciaElementoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}
