import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AlgoritmoHash } from '../algoritmo-hash.enum';

export class CreateReferenciaDto {
  @IsString()
  @IsNotEmpty({ message: 'O texto da referência é obrigatório' })
  texto: string;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsEnum(AlgoritmoHash)
  @IsOptional()
  algoritmoHash?: AlgoritmoHash;

  @IsString()
  @IsNotEmpty({ message: 'Os metadados são obrigatórios (podem ser um JSON stringificado)' })
  metadados: string;

  @IsNumber()
  @IsOptional()
  idUsuarioCriacao?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  idsElementos?: number[];
}