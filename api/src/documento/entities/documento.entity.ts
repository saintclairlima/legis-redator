import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { SituacaoDocumentoEntity } from 'src/situacao-documento/entities/situacao-documento.entity';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'Documento', schema: 'dbo' })
export class DocumentoEntity {
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

    @CreateDateColumn({ type: 'datetime2' })
    dataCriacao: Date;

    @Column()
    idUsuarioCriacao: number;

    @ManyToOne(() => UsuarioEntity, { createForeignKeyConstraints: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'idUsuarioCriacao' })
    usuarioCriacao: UsuarioEntity;

    @UpdateDateColumn({ type: 'datetime2', nullable: true })
    dataUltimaAlteracao?: Date;

    @Column({ nullable: true })
    idUsuarioAlteracao?: number;

    @Column()
    idSituacaoDocumento: number;
    @ManyToOne(() => SituacaoDocumentoEntity, situacaoDocumento => situacaoDocumento.id)
    @JoinColumn({ name: 'idSituacaoDocumento', foreignKeyConstraintName: 'Documento_SituacaoDocumento_FK' })
    situacao: SituacaoDocumentoEntity;

    @OneToMany(() => ElementoEntity, elemento => elemento.documento)
    elementos: ElementoEntity[];
}
