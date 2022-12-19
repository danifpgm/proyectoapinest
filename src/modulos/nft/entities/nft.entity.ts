import { Usuario } from "src/modulos/auth/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('nft')
export class Nft {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    nombre: string;

    @Column('text')
    img?: string;

    @OneToOne(
        () => Usuario,
        (usuario) => usuario.creaNft
    )
    @JoinColumn()
    creaUsuario?: Usuario

    @ManyToOne(
        () => Usuario,
        ( usuario ) => usuario.poseeNft,
        { onDelete: 'CASCADE' }
     )
    poseeUsuario: Usuario
}
