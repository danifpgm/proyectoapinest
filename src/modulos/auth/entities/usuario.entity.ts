import { Broker } from "src/modulos/broker/entities/broker.entity";
import { Cripto } from "src/modulos/cripto/entities/cripto.entity";
import { Nft } from "src/modulos/nft/entities/nft.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('usuarios')
@Unique(["correo"]) 
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    passwd: string;

    @Column('text')
    correo: string;

    @Column('text')
    nombreCompleto: string;

    @Column('bool')
    esActivo: boolean;

    @Column('text', {
        array: true,
        default: ['usuario']
    })
    roles: string[]

    @OneToOne(
    () => Nft,
    (nft) => nft.creaUsuario,
    { cascade: true, eager: true }
    )
    creaNft?: Nft;
    
    @OneToMany(
        () => Nft,
        (nft) => nft.poseeUsuario,
        { cascade: true, eager: true }
    )
    poseeNft?: Nft[];

    @ManyToMany(
    () => Cripto,
    ( cripto ) => cripto.usuarios
    )
    @JoinTable({ name: 'usuario_posee_cripto' })
    criptos: Cripto[]

    @ManyToMany(
        () => Broker,
        ( broker ) => broker.usuarios
     )
     brokers: Broker[]

}
