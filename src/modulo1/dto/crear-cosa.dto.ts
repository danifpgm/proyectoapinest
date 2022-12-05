import { IsString, IsDecimal } from "class-validator";

export class crearCosaDto {
    @IsDecimal( { message: `El campo id debe ser un numero` } )
    readonly id: number;
    
    @IsString( { message: `El campo id debe ser un tecto corto` } )
    readonly nombre: string;
}