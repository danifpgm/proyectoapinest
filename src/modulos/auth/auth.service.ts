import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-Usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';


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
  
  async login( loginUserDto: LoginUsuarioDto ){
    try {
      const { correo, passwd } = loginUserDto;
      const usuario = await this.usuarioRepositorio.findOne({ 
        where: { correo }
        //Con esto no funciona
        //select: { correo: true, passwd: true }
       });

      if ( !usuario ) 
        throw new UnauthorizedException ('Credenciales no válidas (email)');

      //Con esta comprobación tampoco funciona
      // if (!bcrypt.compareSync( passwd, usuario.passwd ))
      //   throw new UnauthorizedException('Credenciales no válidas (email)')
      
      return {
        ...usuario, 
        token: this.getJwtToken({ correo: usuario.correo })
      }
      
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findOne(idUsuario: string) {
    return this.usuarioRepositorio.findOne({
      where: { 
        id: idUsuario
      },
      relations: {
        poseeNft: true
      }
    });
  }
  
  update(id: number, actualizarUsuarioDto: ActualizarUsuarioDto) {
    return `This action updates a #${id} broker`;
  }

  async findAll() {
    return this.usuarioRepositorio.find({});
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    await this.usuarioRepositorio.remove(usuario);
    return `El usuario ${usuario.nombreCompleto} ha sido borrado`;
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
