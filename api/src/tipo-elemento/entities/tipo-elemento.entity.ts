import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum RotuloTipoElemento {
    Parte = 'Parte',
    Livro = 'Livro',
    Titulo = 'Título',
    Capitulo = 'Capítulo',
    Secao = 'Seção',
    Subsecao = 'Subseção',
    Artigo = 'Artigo',
    Paragrafo = 'Parágrafo',
    Inciso = 'Inciso',
    Alinea = 'Alínea',
    Item = 'Item'
}

@Entity({ name: 'TipoElemento', schema: 'dbo' })
export class TipoElementoEntity extends EntidadeBaseAuditavel {
    @PrimaryGeneratedColumn({ name: 'idTipoElemento', primaryKeyConstraintName: 'TipoElemento_PK' })
    id: number;

    @Column({
        type: 'nvarchar', enum: RotuloTipoElemento, default: RotuloTipoElemento.Artigo,
        length: 20, unique: true
    })
    rotulo: string;

    @Column({ length: 500, nullable: true })
    descricao?: string;
}
