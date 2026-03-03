import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Referencia', schema: 'dbo' })
export class ReferenciaEntity {
    @PrimaryGeneratedColumn({ name: 'idReferencia', primaryKeyConstraintName: 'Referencia_PK' })
    id: number;

    @Column({ type: 'varchar', length: 'MAX' })
    texto: string;

    @Column({ type: 'varchar', length: 'MAX' })
    hash: string;

    @Column({ type: 'varchar', length: 'MAX' })
    metadados: string;

    @ManyToMany(() => ElementoEntity, elemento => elemento.referencias)
    elementos: ElementoEntity[];
}
