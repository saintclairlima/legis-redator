import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { CreateDateColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class EntidadeBaseAuditavel {

  @CreateDateColumn({ type: 'datetime2' })
  dataCriacao: Date;

  @Column({ select: false })
  idUsuarioCriacao: number;

  @ManyToOne(() => UsuarioEntity, { createForeignKeyConstraints: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'idUsuarioCriacao' })
  usuarioCriacao: UsuarioEntity;

  @UpdateDateColumn({ type: 'datetime2', nullable: true })
  dataUltimaAlteracao?: Date;

  @Column({ nullable: true, select: false })
  idUsuarioAlteracao?: number;

  @ManyToOne(() => UsuarioEntity, { createForeignKeyConstraints: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'idUsuarioAlteracao' })
  usuarioAlteracao?: UsuarioEntity;

  @DeleteDateColumn({ type: 'datetime2', nullable: true})
  dataExclusao?: Date;

  @Column({ nullable: true, select: false })
  idUsuarioExclusao?: number;

  @ManyToOne(() => UsuarioEntity, { createForeignKeyConstraints: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'idUsuarioExclusao' })
  usuarioExclusao?: UsuarioEntity;
}
