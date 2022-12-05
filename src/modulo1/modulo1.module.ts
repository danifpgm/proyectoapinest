import { Module } from '@nestjs/common';
import { Controlador1Controller } from './controlador1/controlador1.controller';

@Module({
  controllers: [Controlador1Controller],
})
export class Modulo1Module {}
