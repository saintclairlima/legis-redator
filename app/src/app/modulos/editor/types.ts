
export type TipoBloco = 'paragraph' | 'h1' | 'h2' | 'list-item';

export type AcaoOpcaoMenu =
  | { tipo: 'alterarTipo'; valor: TipoBloco }
  | { tipo: 'anotacao'; valor: null }
  | { tipo: 'referencias'; valor: null }
  | { tipo: 'violacoes'; valor: null }
  | { tipo: 'remover'; valor: null };

export enum TipoMenu {
  TIPOS = 'tipos',
  ACOES = 'acoes',
  ESTILO = 'estilo'
}

export interface DadosBlocoEdicao {
  id: string;
  tipo: TipoBloco;
  conteudo: string;
  nivelIndentacao: number;
}

export interface DadosBlocoEmFoco {
  id: string;
  cursorNoFim?: boolean | null;
  mostrarMenu?: boolean | null;
}