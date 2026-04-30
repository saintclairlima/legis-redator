import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ListaDtoRequisicao } from 'src/entidade-base/lista.dto';

export class DocumentoQueryDto extends ListaDtoRequisicao{

  @IsOptional()
  @IsString()
  busca?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  idSituacao?: number;
}