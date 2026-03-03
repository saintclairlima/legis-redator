import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'SituacaoElemento', schema: 'dbo' })
export class SituacaoElementoEntity {
    @PrimaryGeneratedColumn({ name: 'idSituacaoElemento', primaryKeyConstraintName: 'SituacaoElemento_PK' })
    id: number;

    @Column({ length: 50, unique: true })
    rotulo: string;

    @Column({ length: 500, nullable: true })
    descricao?: string;
}