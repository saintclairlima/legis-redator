import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateReferenciaDto } from './create-referencia.dto';

export class UpdateReferenciaDto extends PartialType(CreateReferenciaDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}
