import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modulo1Module } from './modulo1/modulo1.module';

@Module({
  imports: [Modulo1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
