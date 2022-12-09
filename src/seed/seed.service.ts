import { Injectable } from '@nestjs/common';
import { ProductosServicio } from 'src/productos/productos.service';
import * as DatosIniciales  from '../seed/datos/csv.json';


@Injectable()
export class SeedServicio {
  constructor( private readonly productosServicio: ProductosServicio){ }
  async ejecutarSeed() {
    this.insertarNuevosProductos();
    return `seed ejecutada`;
  }
  
  private async insertarNuevosProductos(){
    await this.productosServicio.borrarTodosElementos();
    return true
  } 
}
