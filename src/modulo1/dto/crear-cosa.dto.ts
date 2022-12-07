import { IsString, IsNumber } from "class-validator";

export class crearCosaDto {
    @IsNumber()
    readonly id: number;
    
    @IsString( { message: `El campo id debe ser un texto corto` } )
    readonly nombre: string;
}