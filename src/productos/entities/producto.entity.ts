import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('increment')
    id: number;

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

    @BeforeInsert()
    checkSlugInsert(){
    if (!this.slug){
        this.slug = this.nombre
    }
    this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }
}
