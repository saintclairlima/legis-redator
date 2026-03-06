import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'Anotacao', schema: 'dbo' })
export class AnotacaoEntity  extends EntidadeBaseAuditavel {
    @PrimaryGeneratedColumn({ name: 'idAnotacao', primaryKeyConstraintName: 'Anotacao_PK' })
    id: number;

    @Column({ type: 'text' })
    texto: string;

    @Column({ nullable: true })
    idAnotacaoSeguinte: number;

    @ManyToOne(() => ElementoEntity, elemento => elemento.anotacoes)
    @JoinColumn({ name: 'idElemento', foreignKeyConstraintName: 'Anotacao_Elemento_FK' })
    elemento: ElementoEntity;
}
