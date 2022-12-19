import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateBrokerDto {
    @IsString()
    nombre: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio: number;
}
