import { DocumentoEntity } from "src/documento/entities/documento.entity";
import { EntidadeBaseAuditavel } from "src/entidade-base/entidade-base.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TipoPermissao {
  Leitor = 'Leitor',
  Editor = 'Editor',
  Administrador = 'Administrador'
}

@Entity({ name: 'PermissaoDocumento', schema: 'dbo' })
export class PermissaoDocumentoEntity extends EntidadeBaseAuditavel {
  @PrimaryGeneratedColumn({ name: 'idPermissao', primaryKeyConstraintName: 'PermissaoDocumento_PK' })
  id: number;

  @Column()
  idDocumento: number;

  @ManyToOne(() => DocumentoEntity)
  @JoinColumn({ name: 'idDocumento', foreignKeyConstraintName: 'PermissaoDocumento_Documento_FK' })
  documento: DocumentoEntity;

  @Column()
  idUsuario: number;

  @ManyToOne(() => UsuarioEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;

  @Column({ type: 'nvarchar', enum:TipoPermissao, length: 20 })
  permissao: TipoPermissao;
}
