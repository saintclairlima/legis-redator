import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário que está alterando é obrigatório' })
  idUsuarioAlteracao: number;
}