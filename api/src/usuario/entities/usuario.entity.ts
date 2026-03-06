import { PortalEntity } from 'src/api-config/portal-entity.decorator';
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@PortalEntity('pessoa')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}

@PortalEntity('sujeito')
export class SujeitoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pessoa_id: number;

  @OneToOne(() => PessoaEntity)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: PessoaEntity;
}

@PortalEntity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sujeito_id: number;
  
  @OneToOne(() => SujeitoEntity)
  @JoinColumn({ name: 'sujeito_id' })
  sujeito: SujeitoEntity;
}
