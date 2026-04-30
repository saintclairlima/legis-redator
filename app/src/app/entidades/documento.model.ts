export type DtoCriacaoDocumento = Partial<Documento> & {
}

class Query{
  page?: number;
  size?: number;
  sort?: string;
}

export enum RotuloSituacaoDocumento {
  Rascunho = 'Rascunho',
  Edicao = 'Edição',
  Concluido = 'Concluído',
  Arquivado = 'Arquivado'
}

export interface DocumentoQuery extends Query{
  busca?: string;
  idSituacao?: number;
}

export const getSituacaoDocumento= (rotulo: RotuloSituacaoDocumento) => {
  return situacoesDocumento.find(s => s.rotulo === rotulo)?? situacoesDocumento[0];
}

export const situacoesDocumento = [
  { id: 1, rotulo: RotuloSituacaoDocumento.Rascunho },
  { id: 16, rotulo: RotuloSituacaoDocumento.Edicao },
  { id: 15, rotulo: RotuloSituacaoDocumento.Concluido },
  { id: 14, rotulo: RotuloSituacaoDocumento.Arquivado }
]

export class SituacaoDocumento{
  id: number;
  rotulo: RotuloSituacaoDocumento;
}

export class Documento{
  id: number;
  numero: number;
  ano: number;
  rotulo: string;
  descricao?: string;
  idSituacaoDocumento: number;
  situacao: SituacaoDocumento;
  dataUltimaAlteracao?: Date;
}
