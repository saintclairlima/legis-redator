import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'pessoa', database: 'dbRH_Homolog', schema: 'auth', synchronize: false })
export class PessoaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}

@Entity({ name: 'sujeito', database: 'dbRH_Homolog', schema: 'auth', synchronize: false })
export class SujeitoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pessoa_id: number;

    @OneToOne(() => PessoaEntity)
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: PessoaEntity;
}

@Entity({ name: 'usuario', database: 'dbRH_Homolog', schema: 'auth', synchronize: false })
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sujeito_id: number;
    
    @OneToOne(() => SujeitoEntity)
    @JoinColumn({ name: 'sujeito_id' })
    sujeito: SujeitoEntity;
}
