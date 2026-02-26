# Definições do Banco de Dados
## Conceitos base conforme a Lei 95/1998
Na lei de de técnica legislativa, descreve-se a estrutura de documentos legislativos da seguinte forma:

    Art. 10. Os textos legais serão articulados com observância dos seguintes princípios:

    I - a unidade básica de articulação será o artigo, indicado pela abreviatura "Art.", seguida de numeração ordinal até o nono e cardinal a partir deste;

    II - os artigos desdobrar-se-ão em parágrafos ou em incisos; os parágrafos em incisos, os incisos em alíneas e as alíneas em itens;
    
    (...)

    V - o agrupamento de artigos poderá constituir Subseções; o de Subseções, a Seção; o de Seções, o Capítulo; o de Capítulos, o Título; o de Títulos, o Livro e o de Livros, a Parte;

    VI - os Capítulos, Títulos, Livros e Partes serão grafados em letras maiúsculas e identificados por algarismos romanos, podendo estas últimas desdobrar-se em Parte Geral e Parte Especial ou ser subdivididas em partes expressas em numeral ordinal, por extenso;

    VII - as Subseções e Seções serão identificadas em algarismos romanos, grafadas em letras minúsculas e postas em negrito ou caracteres que as coloquem em realce;

    VIII - a composição prevista no inciso V poderá também compreender agrupamentos em Disposições Preliminares, Gerais, Finais ou Transitórias, conforme necessário.

É dado que a unidade básica de articulação é o artigo, cuja hierarquia de desdobramentos é:

    Artigo (Art.)
    ├── Parágrafo (§)
    │   │
    │   └── Inciso
    │       │
    │       └── Alínea
    │           │
    │           └── Item
    │
    └── Inciso
        │
        └── Alínea
            │
            └── Item

Assim, a hierarquia dos agrupamentos de artigos componentes das leis é:

    Texto Legal
    │
    ├── Parte (Geral, Especial ou numerada ordinariamente por extenso)
    │   │
    │   └── Livro
    │       │
    │       └── Título
    │           │
    │           └── Capítulo
    │               │
    │               └── Seção
    │                   │
    │                   └── Subseção
    │
    └── Agrupamentos Especiais (podem existir em vários níveis, conforme necessário)
        ├── Disposições Preliminares
        ├── Disposições Gerais
        ├── Disposições Finais
        └── Disposições Transitórias

## Definição da estrutura a nível de banco de dados

A representação é feita utilizando um banco relacional, com as seguintes tabelas:

### SituacaoDocumento
Armazena os estados possíveis em que um documento pode se encontrar (ex: "Em elaboração", "Publicado", "Cancelado").
- IdSituacaoDocumento (PK): Identificador único da situação (autoincremento).
- Rotulo: Nome curto ou título do estado (ex: "Rascunho").
- Descricao: Detalhamento opcional sobre o que aquele estado representa.

### SituacaoElemento
Funciona de forma análoga à anterior, mas foca no estado individual de cada fragmento (elemento) do documento.
- IdSituacaoElemento (PK): Identificador único da situação do elemento.
- Rotulo: Nome do estado do elemento (ex: "Vigente", "Revogado").
- Descricao: Explicação detalhada da situação.

### TipoElemento
Define a categoria técnica de cada parte do documento (ex: "Artigo", "Parágrafo", "Inciso").
- IdTipoElemento (PK): Identificador único do tipo de elemento.
- Rotulo: Nome do tipo (ex: "Capítulo").
- Descrição: Texto explicativo sobre a finalidade deste tipo.

### Documento
É a entidade principal que agrupa as informações de cabeçalho e metadados de uma norma ou peça jurídica.
- IdDocumento (PK): Identificador único do documento.
- Numero / Ano: Identificação oficial do documento (ex: Lei nº 123 / 2024).
- Rotulo: Título ou nome curto do documento.
- Descricao: Ementa ou resumo do conteúdo.
- IdSituacaoDocumento (FK): Referência ao estado atual do documento (padrão é o ID 1).
- Campos de Auditoria: Registra criador, data de criação, alterador e data de alteração.

### Elemento
A tabela responsável pelo conteúdo textual. Ela utiliza uma estrutura de árvore (hierarquia) e lista encadeada (ordem).
- IdElemento (PK): Identificador único do elemento do texto.
- IdDocumento (FK): Vinculação obrigatória ao documento pai.
- IdTipoElemento (FK): Define se este elemento é um Artigo, Parágrafo, etc.
- Texto: O conteúdo textual propriamente dito (suporta grandes volumes de dados).
- IdElementoPai (FK): Auto-relacionamento que permite hierarquia (ex: um Inciso aponta para o ID de um Artigo).
- IdElementoSeguinte (FK): Auto-relacionamento para manter a ordem sequencial dos elementos no texto final do documento.
- IdSituacaoElemento (FK): Estado atual deste elemento específico.
- Campos de Auditoria: Registra criador, data de criação, alterador e data de alteração.


``` SQL
CREATE TABLE dbLegisRedator.dbo.SituacaoDocumento (
	IdSituacaoDocumento int IDENTITY(1,1) NOT NULL,
	Rotulo varchar(50) COLLATE Latin1_General_CI_AS NOT NULL,
	Descricao varchar(500) COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT SituacaoDocumento_PK PRIMARY KEY (IdSituacaoDocumento)
);

CREATE TABLE dbLegisRedator.dbo.SituacaoElemento (
	IdSituacaoElemento int IDENTITY(1,1) NOT NULL,
	Rotulo varchar(200) COLLATE Latin1_General_CI_AS NOT NULL,
	Descricao varchar(500) COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT SituacaoElemento_PK PRIMARY KEY (IdSituacaoElemento)
);

CREATE TABLE dbLegisRedator.dbo.TipoElemento (
	IdTipoElemento int IDENTITY(1,1) NOT NULL,
	Rotulo varchar(20) COLLATE Latin1_General_CI_AI NOT NULL,
	Descrição varchar(500) COLLATE Latin1_General_CI_AI NULL,
	CONSTRAINT TipoElemento_PK PRIMARY KEY (IdTipoElemento)
);

CREATE TABLE dbLegisRedator.dbo.Documento (
	IdDocumento int IDENTITY(1,1) NOT NULL,
	Numero int NOT NULL,
	Ano int NOT NULL,
	Rotulo varchar(200) COLLATE Latin1_General_CI_AI NOT NULL,
	Descricao varchar(500) COLLATE Latin1_General_CI_AI NULL,
	IdSituacaoDocumento int DEFAULT 1 NOT NULL,
	DataCriacao datetime2(0) DEFAULT sysdatetime() NOT NULL,
	IdUsuarioCriacao int NOT NULL,
	DataUltimaAlteracao datetime2(0) NULL,
	IdUsuarioAlteracao int NULL,
	CONSTRAINT Documento_PK PRIMARY KEY (IdDocumento),
	CONSTRAINT Documento_SituacaoDocumento_FK FOREIGN KEY (IdSituacaoDocumento) REFERENCES dbLegisRedator.dbo.SituacaoDocumento(IdSituacaoDocumento)
);

CREATE TABLE dbLegisRedator.dbo.Elemento (
	IdElemento int IDENTITY(1,1) NOT NULL,
	IdDocumento int NOT NULL,
	IdTipoElemento int NOT NULL,
	Texto varchar(1) COLLATE Latin1_General_CI_AI NOT NULL,
	IdElementoPai int NULL,
	IdElementoSeguinte int NULL,
	IdSituacaoElemento int DEFAULT 1 NOT NULL,
	IdUsuarioCriacao int NOT NULL,
	DataCriacao datetime2(0) DEFAULT sysdatetime() NOT NULL,
	IdUsuarioAlteracao int NULL,
	DataUltimaAlteracao datetime2(0) NULL,
	CONSTRAINT Elemento_PK PRIMARY KEY (IdElemento),
	CONSTRAINT Elemento_Documento_FK FOREIGN KEY (IdDocumento) REFERENCES dbLegisRedator.dbo.Documento(IdDocumento),
	CONSTRAINT Elemento_Elemento_Pai_FK FOREIGN KEY (IdElementoPai) REFERENCES dbLegisRedator.dbo.Elemento(IdElemento),
	CONSTRAINT Elemento_Elemento_Seguinte_FK FOREIGN KEY (IdElementoSeguinte) REFERENCES dbLegisRedator.dbo.Elemento(IdElemento),
	CONSTRAINT Elemento_SituacaoElemento_FK FOREIGN KEY (IdSituacaoElemento) REFERENCES dbLegisRedator.dbo.SituacaoElemento(IdSituacaoElemento),
	CONSTRAINT Elemento_TipoElemento_FK FOREIGN KEY (IdTipoElemento) REFERENCES dbLegisRedator.dbo.TipoElemento(IdTipoElemento)
);
```