import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthServicio } from './auth.service';
import { CrearUsuarioDto } from './dto/crear-Usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuarios')
export class AuthController {
  constructor(private readonly authServicio: AuthServicio) {}

  @Post('registrar')
  crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.authServicio.crear(crearUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authServicio.login(loginUsuarioDto);
  }

  @Get()
  findAll() {
    return this.authServicio.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authServicio.findOne(id);
  }

  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.authServicio.remove(id);
  }
}
