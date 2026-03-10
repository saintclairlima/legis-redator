import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenciaDto } from './create-referencia.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReferenciaDto extends PartialType(CreateReferenciaDto) {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário que está alterando é obrigatório' })
  idUsuarioAlteracao: number;
}
