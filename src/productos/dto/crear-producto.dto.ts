import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CrearProductoDto {

    @IsString()
    @MinLength(1)
    nombre: string;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;
    
    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsString()
    @IsOptional()
    slug?: string;
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    stock?: number;
    
    @IsString({ each: true })
    @IsArray()
    propiedades: string[];
    
    @IsIn(['objeto1', 'objeto2', 'objeto3', 'objeto4'])
    tipo?: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    imagenes?: string[]
}
