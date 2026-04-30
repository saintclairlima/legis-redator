import { Documento } from "./documento.model";

export enum RotuloTipoElemento {
  Epigrafe = 'Epígrafe',
  Ementa = 'Ementa',
  Preambulo = 'Preâmbulo',
  Parte = 'Parte',
  Livro = 'Livro',
  TITULO = 'Título',
  CAPITULO = 'Capítulo',
  Secao = 'Seção',
  Subsecao = 'Subseção',
  ARTIGO = 'Artigo',
  Paragrafo = 'Parágrafo',
  INCISO = 'Inciso',
  ALINEA = 'Alínea',
  Item = 'Item'
}

export enum RotuloSituacaoElemento {
  Rascunho = 'Rascunho',
  Bloqueado = 'Bloqueado',
  Edicao = 'Edição',
  Concluido = 'Concluído',
  Arquivado = 'Arquivado'
}

export const situacoesElemento = [
  { id: 5, rotulo: RotuloSituacaoElemento.Rascunho },
  { id: 4, rotulo: RotuloSituacaoElemento.Bloqueado },
  { id: 3, rotulo: RotuloSituacaoElemento.Edicao },
  { id: 2, rotulo: RotuloSituacaoElemento.Concluido },
  { id: 1, rotulo: RotuloSituacaoElemento.Arquivado }
]

export const getSituacaoElemento = (rotulo: RotuloSituacaoElemento) => {
  return situacoesElemento.find(s => s.rotulo === rotulo)?? situacoesElemento[0];
}

export const getTipoElemento = (rotulo: RotuloTipoElemento) => {
  return tiposElemento.find(s => s.rotulo === rotulo)?? tiposElemento[9];
}

export const tiposElemento = [
  { id: 14, rotulo: RotuloTipoElemento.Epigrafe },
  { id: 13, rotulo: RotuloTipoElemento.Ementa },
  { id: 12, rotulo: RotuloTipoElemento.Preambulo },
  { id: 11, rotulo: RotuloTipoElemento.Parte },
  { id: 10, rotulo: RotuloTipoElemento.Livro },
  { id: 9, rotulo: RotuloTipoElemento.TITULO },
  { id: 8, rotulo: RotuloTipoElemento.CAPITULO },
  { id: 7, rotulo: RotuloTipoElemento.Secao },
  { id: 6, rotulo: RotuloTipoElemento.Subsecao },
  { id: 5, rotulo: RotuloTipoElemento.ARTIGO },
  { id: 4, rotulo: RotuloTipoElemento.Paragrafo },
  { id: 3, rotulo: RotuloTipoElemento.INCISO },
  { id: 2, rotulo: RotuloTipoElemento.ALINEA },
  { id: 1, rotulo: RotuloTipoElemento.Item }
];

export type DtoCriacaoElemento = Partial<Elemento> & {
  idElementoAnterior: number | null;
  idDocumento: number;
  idTipoElemento: number;
  texto: string;
  idSituacaoElemento: number;
}

export class TipoElemento{
  id: number;
  rotulo: RotuloTipoElemento
}

export class SituacaoElemento{
  id: number;
  rotulo: RotuloSituacaoElemento;
}

export class Elemento {
  id: number;
  idDocumento?: number;
  documento?: Documento;
  idTipoElemento?: number;
  tipoElemento: TipoElemento;
  texto?: string;
  idElementoPai?: number;
  elementoPai?: Elemento;
  filhos?: Elemento[];
  idElementoSeguinte?: number;
  proximoElemento?: Elemento;
  idSituacaoElemento?: number;
  situacaoElemento: SituacaoElemento;
}