
export type TipoBloco = 'paragraph' | 'h1' | 'h2' | 'list-item';

export type AcaoOpcaoMenu =
  | { tipo: 'alterarTipo'; valor: TipoBloco }
  | { tipo: 'anotacao'; valor: null }
  | { tipo: 'referencias'; valor: null }
  | { tipo: 'violacoes'; valor: null }
  | { tipo: 'remover'; valor: null };

export type TipoMenu = 'tipos' | 'acoes' | 'estilizacao' | null;