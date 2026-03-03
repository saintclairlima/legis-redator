import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateSituacaoElementoDto {
  @IsString()
  @IsNotEmpty({ message: 'O rótulo da situação é obrigatório' })
  @MaxLength(50, { message: 'O rótulo deve ter no máximo 50 caracteres' })
  rotulo: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  descricao?: string;
}