import { Usuario_ } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true} )
    nombre: string;

    @Column('text', { unique: true })
    apellidos: string;

    @OneToOne(
        () => Usuario_,
        (usuario) => usuario.cliente,
        { cascade: false }
    )
    usuario?: Usuario_;

}