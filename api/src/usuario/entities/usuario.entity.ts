import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'pessoa', schema: 'auth', synchronize: false })
export class PessoaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}

@Entity({ name: 'sujeito', schema: 'auth', synchronize: false })
export class SujeitoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pessoa_id: number;

    @OneToOne(() => PessoaEntity)
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: PessoaEntity;
}

@Entity({ name: 'usuario', schema: 'auth', synchronize: false })
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sujeito_id: number;
    
    @OneToOne(() => SujeitoEntity)
    @JoinColumn({ name: 'sujeito_id' })
    sujeito: SujeitoEntity;
}
