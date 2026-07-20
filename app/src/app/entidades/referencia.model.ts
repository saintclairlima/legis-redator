export class ResultadoBuscaReferencia {
  id?: number;
  texto: string;
  metadados: string;
  titulo: string;
  autor: string;
  score: number;
}

export class Referencia {
  id?: number;
  texto: string;
  metadados: string;
  titulo: string;
  autor: string;
  score: number;
}

export type DtoCriacaoReferencia = Partial<Referencia> & {
  idElemento: number;
}

export type DtoCriacaoReferenciaElemento = Partial<Referencia> & {
  idReferencia: number;
  idElemento: number;
  score?: number;
  idUsuarioCriacao?: number;
}