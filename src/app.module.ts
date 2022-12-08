import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ComunModule } from './comun/comun.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NOMBRE,
      username: process.env.DB_NOMBREUSU,
      password: process.env.DB_PASSWD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductosModule,
    ComunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
