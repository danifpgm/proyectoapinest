import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductosServicio } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { PaginacionDto } from '../comun/dto/paginacion.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosServicio: ProductosServicio) {}

  @Post()
  crear(@Body() crearProductoDto: CrearProductoDto) {
    return this.productosServicio.crear(crearProductoDto);
  }

  @Get()
  listarTodos( @Query() paginacionDto: PaginacionDto) {
    return this.productosServicio.listarTodos(paginacionDto);
  }

  @Get(':termino')
  listarPorId(@Param('termino') termino: string) {
    return this.productosServicio.listarPorIdPlain(termino);
  }

  @Patch(':id')
  async actualizar(@Param('id', ParseUUIDPipe) id: string,
  @Body() actualizarProductoDto: ActualizarProductoDto) {
    return await this.productosServicio.actualizar(id, actualizarProductoDto);
  }

  @Delete(':id')
  borrar(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosServicio.borrar(id);
  }
}
