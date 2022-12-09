import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { Producto } from './entities/producto.entity';
import { PaginacionDto } from '../comun/dto/paginacion.dto';
import { validate as isUUID } from 'uuid';
import { ProductoImagen } from './entities/imagen-producto.entity';
import { Console } from 'console';


@Injectable()
export class ProductosServicio {
  private readonly logger = new Logger('ProductosService');
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>,

    @InjectRepository(ProductoImagen)
    private readonly productoImagenRepositorio: Repository<ProductoImagen>,
    
    private readonly dataSource: DataSource
  ) {}

  async crear(crearProductoDto: CrearProductoDto) {
    try {
      const { imagenes = [], ...productoDetalles} = crearProductoDto;
      const producto = this.productoRepositorio.create({
        ...productoDetalles,
        imagenes: imagenes.map(imagen => this.productoImagenRepositorio.create({url: imagen}))
      });
      await this.productoRepositorio.save(producto);
      return 'Producto ' + producto.nombre + ' creado con exito'
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  async listarTodos(paginacionDto: PaginacionDto) {
    const { limit , offset } = paginacionDto;
    const productos = await this.productoRepositorio.find({
      take: limit,
      skip: offset,
      relations: {
        imagenes: true
      }
    });
    return productos.map (({imagenes, ...rest}) => ({
      ...rest,
      imagenes: imagenes.map( imagen => imagen.url)
    }))
  }

  async listarPorId(termino: string) {
    let producto: Producto;
    if ( isUUID(termino) ) {
      producto = await this.productoRepositorio.findOne({ where: { id: termino}, relations: { imagenes: true }});
    } else {
      const queryBuilder = this.productoRepositorio.createQueryBuilder('producto');
      producto = await queryBuilder
        .where(`UPPER(nombre) = :nombre or UPPER(slug) = :slug`, {
          nombre: termino.toUpperCase(),
          slug: termino.toUpperCase()
        })
        .leftJoinAndSelect('producto.imagenes','productoImagenes')
        .getOne();
    }
    if (!producto) {
    throw new NotFoundException(`Producto ${producto.nombre} no encontrado`)
    }
    return producto
  }

  async listarPorIdPlain( termino: string ){
    const { imagenes=[], ...rest } = await this.listarPorId( termino );
    return {
      ...rest,
      imagenes: imagenes.map( imagen => imagen.url )
    }
  }

  async actualizar(id: string, actualizarProductoDto: ActualizarProductoDto) {
    const { imagenes, ...rest } = actualizarProductoDto;
    const producto = await this.productoRepositorio.preload({
      id,
      ...rest
    });
    if(!producto) throw new NotFoundException(`Producto ${producto.nombre} no encontrado`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (imagenes){
        await queryRunner.manager.delete(ProductoImagen, { producto: { id: id }});
        producto.imagenes = imagenes.map( 
          image => this.productoImagenRepositorio.create ({ url: image }))
      }else {
        producto.imagenes = await this.productoImagenRepositorio.findBy({ producto: { id }});
      }
      await queryRunner.manager.save(producto);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.listarPorIdPlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.manejarExcepcionesBD(error);
    }
  }

  async borrar(id: string) {
    const producto = await this.listarPorId(id);
    await this.productoRepositorio.remove(producto);
    return 'Producto ' + producto.nombre + ' borrado';
  }

  async borrarTodosElementos() {
    const query = this.productoRepositorio.createQueryBuilder('product');
    try {
      return await query
              .delete()
              .where({})
              .execute()
    } catch (error) {
      this.manejarExcepcionesBD( error )
    }
  }

  private manejarExcepcionesBD( error: any) {
    if (error.code === '23505'){
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado, comrpueba los errores')
  }
}
