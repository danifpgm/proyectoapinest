import { Module } from '@nestjs/common';
import { ProductosServicio } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoImagen } from './entities/imagen-producto.entity';
import { Type } from 'class-transformer';

@Module({
  controllers: [ProductosController],
  providers: [ProductosServicio],
  imports: [
    TypeOrmModule.forFeature([Producto, ProductoImagen])
  ],
  exports: [ProductosServicio, TypeOrmModule]
})
export class ProductosModule {}
