import { Controller, Post,  Get, Body } from '@nestjs/common';
import { UsuarioPoseeCriptoService } from './usuarioPoseeCripto.service';
import { CrearUsuarioPoseeCriptoDto } from './dto/crear-usuarioPoseeCripto.dto';

@Controller('usuario-posee-cripto')
export class UsuarioPoseeCriptoController {
  constructor(private readonly usuarioPoseeCriptoService: UsuarioPoseeCriptoService) {}

  @Post()
  create(@Body() crearUsuarioPoseeCriptoDto: CrearUsuarioPoseeCriptoDto) {
    return this.usuarioPoseeCriptoService.crear(crearUsuarioPoseeCriptoDto);
  }

  @Get()
  findAll() {
    return this.usuarioPoseeCriptoService.findAll();
  }
}
