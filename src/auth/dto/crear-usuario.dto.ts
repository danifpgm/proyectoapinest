import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CrearUsuarioDto {
    
    @IsString()
    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contrasena debe tener una letra grande, pequena y un numero'
    })
    passwd: string;

    @IsString()
    @MinLength(1)
    nombreCompleto:string;

    @IsBoolean()
    esActivo: boolean;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    roles?: string[]

}