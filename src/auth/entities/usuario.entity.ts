import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
 
   @PrimaryGeneratedColumn('uuid')
   id:string;

   @Column('text')
   passwd: string;
 
   @Column('text')
   correo: string;
 
   @Column('text')
   nombreCompleto: string;
 
   @Column('bool', { unique: true })
   esActivo: boolean;
 
   @Column('text', {
       array: true,
       default: ['user']
   })
   roles: string[]
}
