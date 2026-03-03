import { IsNotEmpty, IsString, MaxLength, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateDocumentoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O número do documento é obrigatório' })
  numero: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  @Min(1900, { message: 'Ano inválido' })
  ano: number;

  @IsString()
  @IsNotEmpty({ message: 'O rótulo é obrigatório' })
  @MaxLength(200, { message: 'O rótulo deve ter no máximo 200 caracteres' })
  rotulo: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  descricao?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário criador é necessário' })
  idUsuarioCriacao: number;

  @IsNumber()
  @IsNotEmpty({ message: 'É necessário informar a situação do documento' })
  idSituacaoDocumento: number;
}