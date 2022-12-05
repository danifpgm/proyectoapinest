import { Module } from '@nestjs/common';
import { ServicioService } from 'src/modulo1/servicios/servicio/servicio.service';
import { Controlador1Controller } from './controlador1.controller';

@Module({
  controllers: [Controlador1Controller],
  providers: [ServicioService],
})
export class Modulo1Module {}
