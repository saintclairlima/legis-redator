import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Anotacao', schema: 'dbo' })
export class AnotacaoEntity {
    @PrimaryGeneratedColumn({ name: 'idAnotacao', primaryKeyConstraintName: 'Anotacao_PK' })
    id: number;

    @Column({ type: 'text' })
    texto: string;

    @Column({ nullable: true })
    idAnotacaoSeguinte: number;

    @Column()
    idUsuarioCriacao: number;

    @CreateDateColumn({ type: 'datetime2' })
    dataCriacao: Date;

    @Column({ nullable: true })
    idUsuarioAlteracao?: number;

    @UpdateDateColumn({ type: 'datetime2', nullable: true })
    dataUltimaAlteracao?: Date;

    @ManyToOne(() => ElementoEntity, elemento => elemento.anotacoes)
    @JoinColumn({ name: 'idElemento', foreignKeyConstraintName: 'Anotacao_Elemento_FK' })
    elemento: ElementoEntity;
}
