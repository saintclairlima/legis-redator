import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { ReferenciaElementoEntity } from 'src/referencia-elemento/entities/referencia-elemento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlgoritmoHash } from '../algoritmo-hash.enum';

@Entity({ name: 'Referencia', schema: 'dbo' })
export class ReferenciaEntity extends EntidadeBaseAuditavel {
  @PrimaryGeneratedColumn({ name: 'idReferencia', primaryKeyConstraintName: 'Referencia_PK' })
  id: number;

  @Column({ type: 'varchar', length: 'MAX' })
  texto: string;

  @Column({ type: 'varchar', length: 'MAX' })
  hash: string;

  @Column({ type: 'varchar', length: 20, default: AlgoritmoHash.SHA256 })
  algoritmoHash: AlgoritmoHash;

  @Column({ type: 'varchar', length: 'MAX' })
  metadados: string;

  @OneToMany(() => ReferenciaElementoEntity, referenciaElemento => referenciaElemento.referencia)
  elementosReferencia: ReferenciaElementoEntity[];
}
