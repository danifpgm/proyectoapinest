import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { AuthServicio } from './auth.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('privado')
  @UseGuards(AuthGuard())
  testingPrivateRoute(){
    return {
      ok: true,
      msg: 'Hola mundo privado'
    }
  }

  @Get()
  findAll() {
    return this.authServicio.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authServicio.findOne(id);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
    return this.authServicio.actualizar(id, actualizarUsuarioDto);
  }

  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.authServicio.remove(id);
  }
}
