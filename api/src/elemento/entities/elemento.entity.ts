import { AnotacaoEntity } from 'src/anotacao/entities/anotacao.entity';
import { DocumentoEntity } from 'src/documento/entities/documento.entity';
import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { ReferenciaEntity } from 'src/referencia/entities/referencia.entity';
import { SituacaoElementoEntity } from 'src/situacao-elemento/entities/situacao-elemento.entity';
import { TipoElementoEntity } from 'src/tipo-elemento/entities/tipo-elemento.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Elemento', schema: 'dbo' })
export class ElementoEntity extends EntidadeBaseAuditavel{
  @PrimaryGeneratedColumn({ name: 'idElemento', primaryKeyConstraintName: 'Elemento_PK' })
  id: number;

  @Column()
  idDocumento: number;

  @ManyToOne(() => DocumentoEntity, documento => documento.elementos)
  @JoinColumn({ name: 'idDocumento', foreignKeyConstraintName: 'Elemento_Documento_FK' })
  documento: DocumentoEntity;

  @Column()
  idTipoElemento: number;

  @ManyToOne(() => TipoElementoEntity)
  @JoinColumn({ name: 'idTipoElemento', foreignKeyConstraintName: 'Elemento_TipoElemento_FK' })
  tipoElemento: TipoElementoEntity;

  @Column({ type: 'nvarchar', length: 'max', default: '' })
  texto: string;

  @Column({ nullable: true })
  idElementoPai?: number | null;

  @ManyToOne(() => ElementoEntity, (elemento) => elemento.filhos)
  @JoinColumn({ name: 'idElementoPai', foreignKeyConstraintName: 'Elemento_Pai_FK' })
  elementoPai?: ElementoEntity;

  @OneToMany(() => ElementoEntity, (elemento) => elemento.elementoPai)
  filhos: ElementoEntity[];

  @Column({ nullable: true })
  idElementoSeguinte?: number | null;

  @OneToOne(() => ElementoEntity, { nullable: true })
  @JoinColumn({ name: 'idElementoSeguinte', foreignKeyConstraintName: 'FK_Elemento_Seguinte_Unique' })
  elementoSeguinte?: ElementoEntity;

  @Column()
  idSituacaoElemento: number;

  @ManyToOne(() => SituacaoElementoEntity)
  @JoinColumn({ name: 'idSituacaoElemento', foreignKeyConstraintName: 'Elemento_SituacaoElemento_FK' })
  situacaoElemento: SituacaoElementoEntity;
  
  @OneToMany(() => AnotacaoEntity, anotacao => anotacao.elemento)
  anotacoes: AnotacaoEntity[];

  @ManyToMany(() => ReferenciaEntity, referencia => referencia.elementos)
  @JoinTable({
    name: 'ReferenciaElemento',
    schema: 'dbo',
    joinColumn: { name: 'idElemento', referencedColumnName: 'id', foreignKeyConstraintName: 'ReferenciaElemento_Elemento_FK' },
    inverseJoinColumn: { name: 'idReferencia', referencedColumnName: 'id', foreignKeyConstraintName: 'ReferenciaElemento_Referencia_FK' }
  })
  referencias: ReferenciaEntity[];
}