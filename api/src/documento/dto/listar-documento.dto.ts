import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ListaDtoRequisicao } from 'src/entidade-base/lista.dto';

export class DocumentoQueryDto extends ListaDtoRequisicao{

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (value === 'null' || value === 'undefined' || value === '') return undefined;
    else return value;
  })
  busca?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'null' || value === 'undefined' || value === '') return undefined;
    else return Number(value);
  })
  @IsNumber()
  idSituacao?: number;
}