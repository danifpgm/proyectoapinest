import { Broker } from "src/modulos/broker/entities/broker.entity";
import { Nft } from "src/modulos/nft/entities/nft.entity";
import { usuarioPoseeCripto } from "src/modulos/usuario-posee-cripto/entities/usuarioPoseeCripto";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios') 
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    // @PrimaryColumn()
    // dni: string;

    @Column('text', { select: false })
    passwd: string;

    @Column('text', { unique: true })
    correo: string;

    @Column('text')
    nombreCompleto: string;

    @Column('bool', { default: true })
    esActivo: boolean;

    // @Column('text', {
    //     array: true,
    //     default: ['usuario']
    // })
    // roles: string[]

    @Column('text', {
        default: 'usuario'
    })
    rol: string

    // @OneToOne(
    // () => Nft,
    // (nft) => nft.creadoPorUsuario,
    // { cascade: true, eager: true }
    // )
    
    @OneToMany(
        () => Nft,
        (nft) => nft.creadoPorUsuario,
        { cascade: true, eager: true }
    )
    creaNft?: Nft[];
    
    @OneToMany(
        () => Nft,
        (nft) => nft.poseeUsuario,
        { cascade: true, eager: true }
    )
    poseeNft?: Nft[];

    // @ManyToMany(
    // () => Cripto,
    // ( cripto ) => cripto.usuarios,
    // {  onDelete: 'CASCADE' }
    // )
    // @JoinTable({ name: 'usuario_posee_cripto' })
    // criptos: Cripto[]

    @OneToMany(
        () => usuarioPoseeCripto,
        (usuarioPoseeCripto) => usuarioPoseeCripto.usuario,
        { cascade: true, eager: true }
    )
    criptos: usuarioPoseeCripto[]

    @ManyToMany(
        () => Broker,
        ( broker ) => broker.usuarios,
        {  onDelete: 'CASCADE' }
     )
     brokers: Broker[]

     @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.correo = this.correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }
}
