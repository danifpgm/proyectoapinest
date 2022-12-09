import { Injectable } from '@nestjs/common';
import { ProductosServicio } from 'src/productos/productos.service';
import { DatosIniciales }  from './datos/productos';


@Injectable()
export class SeedServicio {
  constructor( private readonly productosServicio: ProductosServicio){ }
  async ejecutarSeed() {
    this.insertarNuevosProductos();
    return `seed ejecutada`;
  }
  
  private async insertarNuevosProductos(){
    await this.productosServicio.borrarTodosElementos();
    const seedProductos = DatosIniciales.productos;
    const insertarPromesas = [];

    seedProductos.forEach ( producto => { 
      insertarPromesas.push(this.productosServicio.crear( producto ));
    });
    await Promise.all (insertarPromesas);
    return true
  } 
}
