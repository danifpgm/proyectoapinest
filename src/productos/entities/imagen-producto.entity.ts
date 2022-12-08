import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";

@Entity()
export class ProductoImagen{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
       () => Producto,
       ( producto ) => producto.imagenes,
       { onDelete: 'CASCADE' }
    )
    producto: Producto
}