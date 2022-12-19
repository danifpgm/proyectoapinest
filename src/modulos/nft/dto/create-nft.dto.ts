import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateNftDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    img: string;

    @IsString()
    @MinLength(1)
    idUsuarioCreador: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    idUsuarioDueno: string;
}
