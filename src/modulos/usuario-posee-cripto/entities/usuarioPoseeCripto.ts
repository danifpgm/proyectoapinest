import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { Cripto } from "src/modulos/cripto/entities/cripto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario_posee_cripto') 
export class usuarioPoseeCripto {
    @PrimaryGeneratedColumn('uuid')
    id:string;
  
    @Column()
    cantidad: number;

    @ManyToOne(
        () => Usuario,
        ( usuario ) => usuario.criptos,
        {  onDelete: 'CASCADE' }
)
    usuario: string;

    @ManyToOne(
        () => Cripto,
        ( cripto ) => cripto.usuarios,
        {  onDelete: 'CASCADE' }
    )
    criptomoneda: string;
}
