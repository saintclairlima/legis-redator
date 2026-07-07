import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReferenciaDto {
  @IsString()
  @IsNotEmpty({ message: 'O texto da referência é obrigatório' })
  texto: string;

  @IsString()
  @IsNotEmpty({ message: 'O hash da referência é obrigatório para integridade' })
  hash: string;

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