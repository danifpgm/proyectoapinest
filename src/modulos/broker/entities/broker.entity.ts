import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('broker')
export class Broker {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    nombre: string;

    @ManyToMany(
    () => Usuario,
    ( usuario ) => usuario.brokers
    )
    @JoinTable({ name: 'broker_tiene_cliente' })
    usuarios: Usuario[]

}
