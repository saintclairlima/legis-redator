import { ElementoEntity } from 'src/elemento/entities/elemento.entity';
import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { ReferenciaEntity } from 'src/referencia/entities/referencia.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'ReferenciaElemento',
  schema: 'dbo',
})
export class ReferenciaElementoEntity extends EntidadeBaseAuditavel {
  @PrimaryGeneratedColumn({ name: 'idReferenciaElemento', primaryKeyConstraintName: 'ReferenciaElemento_PK' })
  id: number;

  @Column()
  idElemento: number;

  @ManyToOne(() => ElementoEntity,  elemento => elemento.referenciasElemento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idElemento', foreignKeyConstraintName: 'ReferenciaElemento_Elemento_FK' })
  elemento: ElementoEntity;

  @Column()
  idReferencia: number;

  @ManyToOne(() => ReferenciaEntity, referencia => referencia.elementosReferencia, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idReferencia', foreignKeyConstraintName: 'ReferenciaElemento_Referencia_FK' })
  referencia: ReferenciaEntity;
  
  @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true })
  score?: number;
}