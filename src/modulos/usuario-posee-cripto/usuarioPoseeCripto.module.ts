import { Module } from '@nestjs/common';
import { UsuarioPoseeCriptoService } from './usuarioPoseeCripto.service';
import { UsuarioPoseeCriptoController } from './usuarioPoseeCripto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarioPoseeCripto } from './entities/usuarioPoseeCripto';

@Module({
  controllers: [UsuarioPoseeCriptoController],
  providers: [UsuarioPoseeCriptoService],
  imports: [ 
    TypeOrmModule.forFeature( [ usuarioPoseeCripto ])
  ],
  exports: [UsuarioPoseeCriptoService, TypeOrmModule]
})
export class UsuarioPoseeCriptoModule {}
