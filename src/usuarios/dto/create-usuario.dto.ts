
import { IsString, MinLength } from "class-validator";

export class CrearUsuarioDto {

    @IsString()
    @MinLength(1)
    email: string;

    @IsString()
    @MinLength(1)
    password: string;

    @IsString()
    @MinLength(1)
    idCliente: string;

}