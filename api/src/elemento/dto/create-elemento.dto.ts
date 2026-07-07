import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateElementoDto {
  @IsString()
  texto: string;

  @IsNumber()
  @IsOptional()
  idElementoAnterior?: number;

  @IsNumber()
  @IsOptional()
  idElementoPai?: number;

  @IsNumber()
  @IsOptional()
  idElementoSeguinte?: number;

  @IsNumber()
  @IsOptional()
  idUsuarioCriacao?: number;

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