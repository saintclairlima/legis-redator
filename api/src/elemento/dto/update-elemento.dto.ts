import { PartialType } from '@nestjs/mapped-types';
import { CreateElementoDto } from './create-elemento.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateElementoDto extends PartialType(CreateElementoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}