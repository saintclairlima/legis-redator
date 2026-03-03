import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'SituacaoDocumento', schema: 'dbo' })
export class SituacaoDocumentoEntity {
    @PrimaryGeneratedColumn({ name: 'idSituacaoDocumento', primaryKeyConstraintName: 'SituacaoDocumento_PK' })
    id: number;

    @Column({ length: 50, unique: true })
    rotulo: string;

    @Column({ length: 500, nullable: true })
    descricao?: string;
}