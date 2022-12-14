import { Cliente } from "src/clientes/entities/cliente.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario_ {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    password?: string;

    @OneToOne(
        () => Cliente,
        (cliente) => cliente.usuario
    )
    @JoinColumn()
    cliente?: Cliente 

}