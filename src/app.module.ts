import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modulo1Module } from './modulo1/modulo1.module';
import { ServicioService } from './servicios/servicio/servicio.service';
@Module({
  imports: [Modulo1Module],
  controllers: [AppController],
  providers: [AppService, ServicioService],
})
export class AppModule {}
