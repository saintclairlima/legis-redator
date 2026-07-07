import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListaDtoResposta<T> {
  itens: T[];
  total: number;

  constructor(resposta: [T[], number]) {
    const [itens, total] = resposta;
    this.itens = itens;
    this.total = total;
  }
}

export class ListaDtoRequisicao {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size: number = 10;

  @IsOptional()
  @IsString()
  sort: string = 'numero,asc';
}
