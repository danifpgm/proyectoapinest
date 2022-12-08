import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductoImagen } from "./imagen-producto.entity";

@Entity()
export class Producto {
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
    
    @Column({
        type:'text',
        nullable: true
    })
    descripcion: string;
    
    @Column('text',{
        unique:true
    })
    slug: string;
    
    @Column({
        type: 'int',
        default: 0
    })
    stock: number;
    
    @Column('text', {
        array: true
    })
    propiedades: string[];
    
    @Column('text')
    tipo: string

    @OneToMany(
        () => ProductoImagen, //regresa un PI
        (productoImagen) => productoImagen.producto,
        { cascade: true, eager: true }
    )
    imagenes?: ProductoImagen[];

    @BeforeInsert()
    comprobarInsertarSlug(){
        if (!this.slug){
            this.slug = this.nombre
        }
        this.slug = this.slug 
                       .toLowerCase()
                       .replaceAll(' ', '_')
                       .replaceAll("'", '')
    }

    @BeforeUpdate()
    comprobarActualizacionSlug(){
        if (!this.slug){
            this.slug = this.nombre
        }
        this.slug = this.slug 
                       .toLowerCase()
                       .replaceAll(' ', '_')
                       .replaceAll("'", '')
    }
}
