import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('controlador1')
export class Controlador1Controller {

  @Get('listar')

  listarTodos() {

    return ['cosa1', 'cosa2', 'cosa3', 'cosa4'];

  }

  @Get(':id')

  listarPorId( @Param('id', ParseIntPipe) id: number ) {

      return id;
  }

}
