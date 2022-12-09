import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthServicio } from './auth.service';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
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
}
