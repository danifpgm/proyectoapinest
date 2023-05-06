import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { usuarioPoseeCripto } from './entities/usuarioPoseeCripto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearUsuarioPoseeCriptoDto } from './dto/crear-usuarioPoseeCripto.dto';

@Injectable()
export class UsuarioPoseeCriptoService {
    constructor (
        @InjectRepository(usuarioPoseeCripto)
        private readonly usuarioPoseeCriptoRepositorio: Repository<usuarioPoseeCripto>
      ) {}

    async crear(crearUsuarioPoseeCriptoDto: CrearUsuarioPoseeCriptoDto) {
      try {
        console.log("Insertando: ", crearUsuarioPoseeCriptoDto);
        const usuarioPoseeCripto = crearUsuarioPoseeCriptoDto;
        await this.usuarioPoseeCriptoRepositorio.save(usuarioPoseeCripto);
        return {
          usuarioPoseeCripto
        }
 
      } catch (error) {
        this.manejarExcepcionesBD(error)
      }
    }

    async findAll() {
      return this.usuarioPoseeCriptoRepositorio.createQueryBuilder('usuario_posee_cripto')
        .select(["usuario_posee_cripto", "usuario.nombreCompleto", "criptomoneda.nombre", "criptomoneda.precio"])
        .leftJoin('usuario_posee_cripto.usuario', 'usuario')
        .leftJoin('usuario_posee_cripto.criptomoneda', 'criptomoneda')
        .getMany();
    }

    private manejarExcepcionesBD (error: any): never{
      if (error.code === '23505')
        throw new BadRequestException(error.detail)
      
      throw new InternalServerErrorException('Error')
    }
}
