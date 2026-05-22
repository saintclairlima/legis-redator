import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenciaDto } from './create-referencia.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateReferenciaDto extends PartialType(CreateReferenciaDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}
