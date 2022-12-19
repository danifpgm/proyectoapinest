import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft } from './entities/nft.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthServicio } from '../auth/auth.service';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(Nft)
    private readonly nftRepositorio: Repository<Nft>,
    private readonly authServicio: AuthServicio
  ){}

  async create(createUsuarioDto: CreateNftDto) {
    try {
      const { idUsuarioCreador, idUsuarioDueno, ...camposNft } = createUsuarioDto;
      const nft = this.nftRepositorio.create({...camposNft});
      const usuarioCreador = await this.authServicio.findOne(idUsuarioCreador);
      const usuarioDueno = await this.authServicio.findOne(idUsuarioDueno);
      nft.creaUsuario = usuarioCreador;
      nft.poseeUsuario = usuarioDueno;
      await this.nftRepositorio.save(nft);
      return `NFT: ${nft.nombre} creado por ${usuarioCreador.nombreCompleto} insertado correctamente. Es propiedad de ${usuarioDueno.nombreCompleto}`
    } catch(error){
        return new InternalServerErrorException('Error en BD')
    }
    
  }

  findAll() {
    return this.nftRepositorio.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} nft`;
  }

  update(id: number, updateNftDto: UpdateNftDto) {
    return `This action updates a #${id} nft`;
  }

  remove(id: number) {
    return `This action removes a #${id} nft`;
  }
}
