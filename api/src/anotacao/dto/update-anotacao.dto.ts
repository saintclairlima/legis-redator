import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateAnotacaoDto } from './create-anotacao.dto';

export class UpdateAnotacaoDto extends PartialType(CreateAnotacaoDto) {
  @IsNumber()
  @IsOptional()
  idUsuarioAlteracao?: number;
}