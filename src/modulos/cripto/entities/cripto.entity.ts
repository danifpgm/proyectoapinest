import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { usuarioPoseeCripto } from "src/modulos/usuario-posee-cripto/entities/usuarioPoseeCripto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('criptomonedas')
export class Cripto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    nombre: string;

     @Column('numeric', {
       default: 0
    })
    precio: number;

    @OneToMany(
       () => usuarioPoseeCripto,
       ( usuarioPoseeCripto ) => usuarioPoseeCripto.criptomoneda,
       {  onDelete: 'CASCADE' }
    )
    usuarios: usuarioPoseeCripto[]
}