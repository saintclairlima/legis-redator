import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAnotacaoDto {
  @IsString()
  @IsNotEmpty({ message: 'O texto da anotação não pode estar vazio' })
  texto: string;

  @IsNumber()
  @IsOptional()
  idAnotacaoSeguinte?: number;

  @IsNumber()
  @IsOptional()
  idUsuarioCriacao?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'É necessário informar o ID do elemento relacionado' })
  idElemento: number;
}