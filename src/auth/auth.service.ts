import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-Usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthServicio {

  constructor (
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>,
    private readonly jwtServicio: JwtService
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto) {
    try {
      const { passwd, ...userData } = crearUsuarioDto;
      const usuario = this.usuarioRepositorio.create({
        ...userData,
        passwd: bcrypt.hashSync( passwd, 10 )
      });
      await this.usuarioRepositorio.save(usuario);
      delete usuario.passwd;

      return {
        ...usuario, 
        token: this.getJwtToken({ correo: usuario.correo })
      }
      
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }
  
  async login(loginUsuarioDto: LoginUsuarioDto) {
    try {
      const { correo, passwd } = loginUsuarioDto;
      const usuario = await this.usuarioRepositorio.findOne({ 
        where: { correo },
        select: { correo: true, passwd: true }
       });

      if ( !usuario ) 
        throw new UnauthorizedException ('Credenciales no válidas (email)');
        
      if (!bcrypt.compareSync( passwd, usuario.passwd ))
        throw new UnauthorizedException('Credenciales no válidas (email)')
      
      return {
        ...usuario, 
        token: this.getJwtToken({ correo: usuario.correo })
      }
      
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }

  private getJwtToken( payload: JwtPayload){
    const token = this.jwtServicio.sign(payload);
    return token;
  }
}
