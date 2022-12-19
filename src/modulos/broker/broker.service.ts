import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Broker } from './entities/broker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrokerService {
  constructor (
    @InjectRepository(Broker)
    private readonly brokerRepositorio: Repository<Broker>
  ) {}

  async crear(CreateBrokerDto: CreateBrokerDto) {
    try {
      const broker = CreateBrokerDto;
      await this.brokerRepositorio.save(broker);
      return broker
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findAll() {
    return this.brokerRepositorio.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} broker`;
  }

  update(id: number, updateBrokerDto: UpdateBrokerDto) {
    return `This action updates a #${id} broker`;
  }

  remove(id: number) {
    return `This action removes a #${id} broker`;
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }
}
