import { IsIn, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateClienteDto {


    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellidos: string;

}