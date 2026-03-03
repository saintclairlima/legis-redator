import { PartialType } from '@nestjs/mapped-types';
import { CreateElementoDto } from './create-elemento.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateElementoDto extends PartialType(CreateElementoDto) {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário que está alterando é obrigatório' })
  idUsuarioAlteracao: number;
}