import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { SituacaoDocumentoEntity } from 'src/situacao-documento/entities/situacao-documento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Documento', schema: 'dbo' })
export class DocumentoEntity extends EntidadeBaseAuditavel {
    @PrimaryGeneratedColumn({ name: 'idDocumento', primaryKeyConstraintName: 'Documento_PK' })
    id: number;

    @Column()
    numero: number;

    @Column()
    ano: number;

    @Column({ length: 200})
    rotulo: string;

    @Column({ length: 500, nullable: true })
    descricao?: string;

    @Column({ select: false })
    idSituacaoDocumento: number;

    @ManyToOne(() => SituacaoDocumentoEntity, situacaoDocumento => situacaoDocumento.id)
    @JoinColumn({ name: 'idSituacaoDocumento', foreignKeyConstraintName: 'Documento_SituacaoDocumento_FK' })
    situacao: SituacaoDocumentoEntity;

    @OneToMany(() => ElementoEntity, elemento => elemento.documento)
    elementos: ElementoEntity[];
}
