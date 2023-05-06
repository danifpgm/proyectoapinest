import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class CrearUsuarioPoseeCriptoDto {
    
    @IsUUID()
    usuario: string;

    @IsUUID()
    criptomoneda: string;

    @IsNumber()
    cantidad: number;
    
}