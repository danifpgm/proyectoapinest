import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicioService } from 'src/modulo1/servicios/servicio/servicio.service';
import { crearCosaDto } from './dto/crear-cosa.dto';

@Controller('controlador1')
@UsePipes( ValidationPipe )
export class Controlador1Controller {
  
  constructor(private servicio: ServicioService) {}

  @Get('listar')
  listarTodos() {
    return ['cosa1', 'cosa2', 'cosa3', 'cosa4'];
  }

  @Get(':id')
  listarPorId( @Param('id', ParseIntPipe) id: number ) {
      return this.servicio.listarPorId(id)
  }

  @Post('nuevo')
  @UsePipes( ValidationPipe )
  crear( @Body() dto: crearCosaDto ){
      return {
          status: 200,
          ok: true,
          datos: dto,
          msg: 'Cosa creada'
      }
  }


}
