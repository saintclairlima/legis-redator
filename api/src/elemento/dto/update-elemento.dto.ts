import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateElementoDto } from './create-elemento.dto';

export class UpdateElementoDto extends PartialType(CreateElementoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}