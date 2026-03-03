import { PartialType } from '@nestjs/mapped-types';
import { CreateAnotacaoDto } from './create-anotacao.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAnotacaoDto extends PartialType(CreateAnotacaoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}