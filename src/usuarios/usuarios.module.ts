import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ClientesModule } from 'src/clientes/clientes.module';
import { Usuario_ } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: 
    [ 
      TypeOrmModule.forFeature([Usuario_]),
      ClientesModule
    ]
})
export class UsuariosModule {}
