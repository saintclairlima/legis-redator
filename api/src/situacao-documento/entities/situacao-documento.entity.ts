import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RotuloSituacaoDocumento {
    Rascunho = 'Rascunho',
    Edicao = 'Edição',
    Concluido = 'Concluído',
    Arquivado = 'Arquivado',
    Excluido = 'Excluído'
    
}

@Entity({ name: 'SituacaoDocumento', schema: 'dbo' })
export class SituacaoDocumentoEntity extends EntidadeBaseAuditavel {
    @PrimaryGeneratedColumn({ name: 'idSituacaoDocumento', primaryKeyConstraintName: 'SituacaoDocumento_PK' })
    id: number;

    @Column({
        type: 'nvarchar', enum: RotuloSituacaoDocumento, default: RotuloSituacaoDocumento.Rascunho,
        length: 50, unique: true
    })
    rotulo: RotuloSituacaoDocumento;

    @Column({ length: 500, nullable: true })
    descricao?: string;
}