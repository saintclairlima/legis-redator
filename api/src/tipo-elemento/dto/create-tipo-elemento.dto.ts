import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTipoElementoDto {
  @IsString()
  @IsNotEmpty({ message: 'O rótulo é obrigatório' })
  @MaxLength(20, { message: 'O rótulo deve ter no máximo 20 caracteres' })
  rotulo: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  descricao?: string;
}