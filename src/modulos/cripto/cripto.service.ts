import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCriptoDto } from './dto/create-cripto.dto';
import { UpdateCriptoDto } from './dto/update-cripto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cripto } from './entities/cripto.entity';

@Injectable()
export class CriptoService {

  constructor (
    @InjectRepository(Cripto)
    private readonly criptoRepositorio: Repository<Cripto>
  ) {}

  async crear(crearCriptoDto: CreateCriptoDto) {
    try {
      const cripto = crearCriptoDto;
      await this.criptoRepositorio.save(cripto);
      return cripto
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findAll() {
    return `This action returns all cripto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cripto`;
  }

  update(id: number, updateCriptoDto: UpdateCriptoDto) {
    return `This action updates a #${id} cripto`;
  }

  remove(id: number) {
    return `This action removes a #${id} cripto`;
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }
}
