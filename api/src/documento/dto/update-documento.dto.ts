import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}