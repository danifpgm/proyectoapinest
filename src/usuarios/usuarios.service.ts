import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario_ } from 'src/usuarios/entities/usuario.entity';
import { ClientesService } from 'src/clientes/clientes.service';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario_)
    private readonly usuarioRepositorio: Repository<Usuario_>,
    private readonly clienteService: ClientesService
  ){}
    
  async create(createUsuarioDto: CrearUsuarioDto) {
    try {
      console.log(createUsuarioDto);
      const { idCliente, ...camposProfile } = createUsuarioDto;
      const usuario = this.usuarioRepositorio.create({...camposProfile});
      const cliente = await this.clienteService.findOne(idCliente);
      usuario.cliente = cliente;
      await this.usuarioRepositorio.save(usuario);
      
      // cliente.profile = profile;
      // await this.clienteService.create(cliente);

      return usuario
    } catch(error){
        return new InternalServerErrorException('Error en BD')
    }
    
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
