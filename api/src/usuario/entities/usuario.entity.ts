import { DboEntity, PortalEntity } from 'src/api-config/portal-entity.decorator';
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@DboEntity('pessoa')
export class PessoaEntity {
  @PrimaryGeneratedColumn({ name: 'IdPessoa' })
  id: number;

  @Column()
  nome: string;
}

@PortalEntity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  id: number;

  @Column({ name: 'IdPessoa', select: false})
  idPessoa: number;

  @Column({ name: 'Login' })
  login: string;

  @Column({ name: 'Senha', select : false })
  senha: string;
  
  @OneToOne(() => PessoaEntity)
  @JoinColumn({ name: 'IdPessoa' })
  pessoa: PessoaEntity;
}
