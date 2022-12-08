import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { CrearProductoDto } from './crear-producto.dto';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;
    
    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsInt()
    @IsOptional()
    @IsPositive()
    stock?: number;
}
