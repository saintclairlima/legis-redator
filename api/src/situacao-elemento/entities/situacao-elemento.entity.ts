import { EntidadeBaseAuditavel } from 'src/entidade-base/entidade-base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RotuloSituacaoElemento {
  Rascunho = 'Rascunho',
  Bloqueado = 'Bloqueado',
  Edicao = 'Edição',
  Concluido = 'Concluído',
  Arquivado = 'Arquivado'
}

@Entity({ name: 'SituacaoElemento', schema: 'dbo' })
export class SituacaoElementoEntity extends EntidadeBaseAuditavel {
  @PrimaryGeneratedColumn({ name: 'idSituacaoElemento', primaryKeyConstraintName: 'SituacaoElemento_PK' })
  id: number;

  @Column({
    type: 'nvarchar', enum: RotuloSituacaoElemento, default: RotuloSituacaoElemento.Rascunho,
    length: 50, unique: true
  })
  rotulo: RotuloSituacaoElemento;

  @Column({ length: 500, nullable: true })
  descricao?: string;
}