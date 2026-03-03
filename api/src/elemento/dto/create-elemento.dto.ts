import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateElementoDto {
  @IsString()
  @IsNotEmpty({ message: 'O texto do elemento é obrigatório' })
  texto: string;

  @IsNumber()
  @IsOptional()
  idElementoPai?: number;

  @IsNumber()
  @IsOptional()
  idElementoSeguinte?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário criador é obrigatório' })
  idUsuarioCriacao: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do documento é obrigatório' })
  idDocumento: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID do tipo de elemento é obrigatório' })
  idTipoElemento: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O ID da situação do elemento é obrigatório' })
  idSituacaoElemento: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  idsReferencias?: number[];
}