import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { Producto } from './entities/producto.entity';
import { PaginacionDto } from '../comun/dto/paginacion.dto';
import { validate as isUUID } from 'uuid';


@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>
  ) {}

  async crear(crearProductoDto: CrearProductoDto) {
    try {
      const producto = this.productoRepositorio.create(crearProductoDto);
      await this.productoRepositorio.save(producto);
      return 'Producto ' + producto.nombre + ' creado con exito'
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  private manejarExcepcionesBD( error: any) {
    if (error.code === '23505'){
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado, comrpueba los errores')
  }

  async listarTodos(paginacionDto: PaginacionDto) {
    const { limit , offset } = paginacionDto;
    return this.productoRepositorio.find({
      take: limit,
      skip: offset
    });
  }

  async listarPorId(termino: string) {
    let producto: Producto;
    if ( isUUID(termino) ) {
      producto = await this.productoRepositorio.findOneBy( { id: termino });
    } else {
      const queryBuilder = this.productoRepositorio.createQueryBuilder();
      producto = await queryBuilder
        .where(`UPPER(nombre) = :nombre o UPPER(slug) = :slug`, {
          nombre: termino.toUpperCase(),
          slug: termino.toUpperCase()
        }).getOne();
    }
    if (!producto){
    throw new NotFoundException(`Producto ${producto.nombre} no encontrado`)
    }
    return producto
  }

  async actualizar(id: string, actualizarProductoDto: ActualizarProductoDto) {
    const producto = await this.productoRepositorio.preload({
      id: id,
      ...actualizarProductoDto,
    });
    if(!producto) throw new NotFoundException(`Producto ${producto.nombre} no encontrado`);
    try {
      await this.productoRepositorio.save(producto);
      return producto
    } catch (error) {
      this.manejarExcepcionesBD(error);
    }
  }

  async borrar(id: string) {
    const producto = await this.listarPorId(id);
    await this.productoRepositorio.remove(producto);
    return 'Producto ' + producto.nombre + ' borrado';
  }
}
