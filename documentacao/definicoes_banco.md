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

A aplicação utiliza um banco de dados relacional para representar documentos legislativos estruturados como uma hierarquia de componentes.

### SituacaoDocumento
Define os estados possíveis de um documento dentro do fluxo editorial.
- idSituacaoDocumento (PK): Identificador único da situação (autoincremento).
- rotulo: Nome curto ou título do estado. Valores possíveis: Rascunho, Edição, Concluído e Arquivado. A exclusão é feita de maneira lógica, apenas.
- descricao: Descrição textual detalhando o significado ou uso da situação.
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.

### SituacaoElemento
Define os estados possíveis de cada elemento textual dentro de um documento. Enquanto o estado do documento controla o fluxo geral da norma, o estado do elemento controla partes específicas do texto.
- idSituacaoElemento (PK): Identificador único da situação do elemento.
- rotulo: Nome do estado do elemento no fluxo de edição. Valores possíveis: Rascunho, Bloqueado, Edição, Concluído e Arquivado. A exclusão é feita de maneira lógica, apenas.
- descricao: Texto opcional detalhando o significado da situação.
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.

### TipoElemento
Define os tipos estruturais que podem compor um documento legislativo. Esses tipos representam os níveis hierárquicos da norma.
- idTipoElemento (PK): Identificador único do tipo de elemento.
- rotulo: Nome do tipo estrutural do elemento. Valores possíveis incluem: Parte, Livro, Título, Capítulo, Seção, Subseção, Artigo, Parágrafo, Inciso, Alínea e Item.
- descrição: Descrição detalhando o papel do tipo dentro da estrutura do documento.
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.

### Documento
É a entidade principal que agrupa os elementos textuais que compõem o documento. Representa uma norma jurídica ou peça legislativa completa.
- idDocumento (PK): Identificador único do documento.
- numero / ano: Identificação oficial do documento (ex: Lei nº 123 / 2024).
- rotulo: Título ou nome curto do documento.
- descricao: Ementa ou resumo descritivo do conteúdo do documento.
- idSituacaoDocumento (FK): Referência ao estado atual do documento
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.

### Elemento
Tabela responsável por armazenar o conteúdo textual estruturado do documento. Cada elemento representa uma unidade lógica da norma (artigo, inciso, parágrafo etc.). A estrutura combina uma estrutura de árvore (hierarquia) e lista encadeada (ordem).
- idElemento (PK): Identificador único do elemento do texto.
- idDocumento (FK): Vinculação obrigatória ao documento pai.
- idTipoElemento (FK): Define se este elemento é um Artigo, Parágrafo, etc.
- texto: O conteúdo textual propriamente dito (suporta grandes volumes de dados).
- idElementoPai (FK): Auto-relacionamento identificador do elemento imediatamente superior na hierarquia (Exemplo: um Inciso pode ter como pai um Artigo; um Parágrafo pode ter como pai um Artigo).
- idElementoSeguinte (FK): Auto-relacionamento identificador do elemento que vem imediatamente após este na sequência textual. Permite manter a ordem sequencial dos elementos no texto final do documento como uma lista encadeada.
- idSituacaoElemento (FK): Estado atual deste elemento específico.
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.


### Referencia
Armazena conteúdos de referência que podem ser associados a elementos do documento, como citações legais, jurisprudência ou textos correlatos.  O conteúdo das referências em si serão conteúdos textuais recuperados de um banco vetorial ou outro banco relacional -- muito provavelmente por uma busca semântica em uma consulta a uma API externa.
- idReferencia (PK): Identificador único da referência.
- texto: Conteúdo textual completo da referência recuperada.
- hash: Hash criptográfico do conteúdo textual da referência. Utilizado para detectar duplicações ou verificar integridade do conteúdo.
- metadados: Informações estruturadas adicionais sobre a referência (ex.: origem, tipo de documento, autor, data de publicação), guardados em formato JSON.
- Ids de usuário: Número do id do usuário do portal do servidor que realizam alterações nos registros.

### ReferenciaElemento
Tabela de relacionamento N:N entre elementos do documento e referências externas. Permite que um elemento possua várias referências e que uma mesma referência seja utilizada em diferentes elementos.
- idElemento (FK): Identificador do elemento do documento associado à referência.
- idReferencia (FK): Identificador da referência vinculada ao elemento.
- A chave primária composta garante que a mesma referência não seja associada mais de uma vez ao mesmo elemento.

### Anotacao
Armazena comentários ou observações associados a elementos do documento. Essas anotações são utilizadas principalmente no processo de edição, revisão ou análise.
- idAnotacao (PK): Identificador único da anotação.
- texto: Conteúdo textual da anotação.
- idAnotacaoSeguinte: Identificador da próxima anotação na sequência. A sequência é organizada como uma lista encadeada, permitindo organizar anotações em uma cadeia ordenada.
- idElemento (FK): Elemento do documento ao qual a anotação está associada.


``` SQL
CREATE TABLE dbLegisRedator.dbo.SituacaoDocumento (
	idSituacaoDocumento int IDENTITY(1,1) NOT NULL,
	rotulo nvarchar(50) COLLATE Latin1_General_CI_AS DEFAULT 'Rascunho' NOT NULL,
	descricao nvarchar(500) COLLATE Latin1_General_CI_AS NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT SituacaoDocumento_PK PRIMARY KEY (idSituacaoDocumento),
	CONSTRAINT UQ_2047a09810ce635a896bf881bed UNIQUE (rotulo)
);
ALTER TABLE dbLegisRedator.dbo.SituacaoDocumento WITH NOCHECK ADD CONSTRAINT CHK_21cf2a70e46d1fc778cd337efe_ENUM CHECK (([rotulo]='Excluído' OR [rotulo]='Arquivado' OR [rotulo]='Concluído' OR [rotulo]='Edição' OR [rotulo]='Rascunho'));

CREATE TABLE dbLegisRedator.dbo.SituacaoElemento (
	idSituacaoElemento int IDENTITY(1,1) NOT NULL,
	rotulo nvarchar(50) COLLATE Latin1_General_CI_AS DEFAULT 'Rascunho' NOT NULL,
	descricao nvarchar(500) COLLATE Latin1_General_CI_AS NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT SituacaoElemento_PK PRIMARY KEY (idSituacaoElemento),
	CONSTRAINT UQ_e35191afc0bb42095f6bfc8784c UNIQUE (rotulo)
);
ALTER TABLE dbLegisRedator.dbo.SituacaoElemento WITH NOCHECK ADD CONSTRAINT CHK_5f4124bd289bcf7aef147aa7b2_ENUM CHECK (([rotulo]='Excluído' OR [rotulo]='Arquivado' OR [rotulo]='Concluído' OR [rotulo]='Edição' OR [rotulo]='Bloqueado' OR [rotulo]='Rascunho'));

CREATE TABLE dbLegisRedator.dbo.TipoElemento (
	idUsuarioExclusao int NULL,
	idTipoElemento int IDENTITY(1,1) NOT NULL,
	rotulo nvarchar(20) COLLATE Latin1_General_CI_AS DEFAULT 'Artigo' NOT NULL,
	descricao nvarchar(500) COLLATE Latin1_General_CI_AS NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	CONSTRAINT TipoElemento_PK PRIMARY KEY (idTipoElemento),
	CONSTRAINT UQ_e99d100b1b6202113b0b63cdaeb UNIQUE (rotulo)
);
ALTER TABLE dbLegisRedator.dbo.TipoElemento WITH NOCHECK ADD CONSTRAINT CHK_4fe1f52ed9d8422e2f8854bb78_ENUM CHECK (([rotulo]='Item' OR [rotulo]='Alínea' OR [rotulo]='Inciso' OR [rotulo]='Parágrafo' OR [rotulo]='Artigo' OR [rotulo]='Subseção' OR [rotulo]='Seção' OR [rotulo]='Capítulo' OR [rotulo]='Título' OR [rotulo]='Livro' OR [rotulo]='Parte'));

CREATE TABLE dbLegisRedator.dbo.Documento (
	idDocumento int IDENTITY(1,1) NOT NULL,
	numero int NOT NULL,
	ano int NOT NULL,
	rotulo nvarchar(200) COLLATE Latin1_General_CI_AS NOT NULL,
	descricao nvarchar(500) COLLATE Latin1_General_CI_AS NULL,
	idSituacaoDocumento int NOT NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT Documento_PK PRIMARY KEY (idDocumento),
	CONSTRAINT Documento_SituacaoDocumento_FK FOREIGN KEY (idSituacaoDocumento) REFERENCES dbLegisRedator.dbo.SituacaoDocumento(idSituacaoDocumento)
);

CREATE TABLE dbLegisRedator.dbo.Elemento (
	idElemento int IDENTITY(1,1) NOT NULL,
	idDocumento int NOT NULL,
	idTipoElemento int NOT NULL,
	texto text COLLATE Latin1_General_CI_AS NOT NULL,
	idElementoPai int NULL,
	idElementoSeguinte int NULL,
	idSituacaoElemento int NOT NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT Elemento_PK PRIMARY KEY (idElemento),
	CONSTRAINT Elemento_Documento_FK FOREIGN KEY (idDocumento) REFERENCES dbLegisRedator.dbo.Documento(idDocumento),
	CONSTRAINT Elemento_Pai_FK FOREIGN KEY (idElementoPai) REFERENCES dbLegisRedator.dbo.Elemento(idElemento),
	CONSTRAINT Elemento_SituacaoElemento_FK FOREIGN KEY (idSituacaoElemento) REFERENCES dbLegisRedator.dbo.SituacaoElemento(idSituacaoElemento),
	CONSTRAINT Elemento_TipoElemento_FK FOREIGN KEY (idTipoElemento) REFERENCES dbLegisRedator.dbo.TipoElemento(idTipoElemento),
	CONSTRAINT FK_Elemento_Seguinte_Unique FOREIGN KEY (idElementoSeguinte) REFERENCES dbLegisRedator.dbo.Elemento(idElemento)
);
 CREATE UNIQUE NONCLUSTERED INDEX REL_9c22d6821acba1237c52e5c88a ON dbLegisRedator.dbo.Elemento (  idElementoSeguinte ASC  )  
	 WHERE  ([idElementoSeguinte] IS NOT NULL)
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


CREATE TABLE dbLegisRedator.dbo.Referencia (
	idReferencia int IDENTITY(1,1) NOT NULL,
	texto varchar(MAX) COLLATE Latin1_General_CI_AS NOT NULL,
	hash varchar(MAX) COLLATE Latin1_General_CI_AS NOT NULL,
	metadados varchar(MAX) COLLATE Latin1_General_CI_AS NOT NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT Referencia_PK PRIMARY KEY (idReferencia)
);

CREATE TABLE dbLegisRedator.dbo.ReferenciaElemento (
	idElemento int NOT NULL,
	idReferencia int NOT NULL,
	CONSTRAINT PK_dfc08d74fb0c7eeacc0def072fd PRIMARY KEY (idElemento,idReferencia),
	CONSTRAINT ReferenciaElemento_Elemento_FK FOREIGN KEY (idElemento) REFERENCES dbLegisRedator.dbo.Elemento(idElemento) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ReferenciaElemento_Referencia_FK FOREIGN KEY (idReferencia) REFERENCES dbLegisRedator.dbo.Referencia(idReferencia)
);
 CREATE NONCLUSTERED INDEX IDX_dda238648b8931d69ef4fe992c ON dbLegisRedator.dbo.ReferenciaElemento (  idReferencia ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX IDX_e6935b5c16d6e133b164e88dfa ON dbLegisRedator.dbo.ReferenciaElemento (  idElemento ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;

CREATE TABLE dbLegisRedator.dbo.Anotacao (
	idAnotacao int IDENTITY(1,1) NOT NULL,
	texto text COLLATE Latin1_General_CI_AS NOT NULL,
	idAnotacaoSeguinte int NULL,
	idElemento int NULL,
	dataCriacao datetime2 DEFAULT getdate() NOT NULL,
	idUsuarioCriacao int NOT NULL,
	dataUltimaAlteracao datetime2 DEFAULT getdate() NULL,
	idUsuarioAlteracao int NULL,
	dataExclusao datetime2 NULL,
	idUsuarioExclusao int NULL,
	CONSTRAINT Anotacao_PK PRIMARY KEY (idAnotacao),
	CONSTRAINT Anotacao_Elemento_FK FOREIGN KEY (idElemento) REFERENCES dbLegisRedator.dbo.Elemento(idElemento)
);
```