import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'TipoElemento', schema: 'dbo' })
export class TipoElementoEntity {
    @PrimaryGeneratedColumn({ name: 'idTipoElemento', primaryKeyConstraintName: 'TipoElemento_PK' })
    id: number;

    @Column({ length: 20, unique: true })
    rotulo: string;

    @Column({ length: 500, nullable: true })
    descricao?: string;
}
