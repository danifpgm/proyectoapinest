import { Module } from '@nestjs/common';
import { AuthServicio } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Usuario } from './entities/usuario.entity';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthServicio, JwtStrategy ],
  imports: [ 
    ConfigModule,
    TypeOrmModule.forFeature( [ Usuario ]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configServicio: ConfigService ) => {
        console.log ('JWT Secret --> ', configServicio.get('JWT_SECRET'));
        return {
          secret: configServicio.get('JWT_SECRET'),
          signOptions: {
              expiresIn: '2h'
          }
        }
      }
    })
  ],
  exports: [ TypeOrmModule, AuthServicio, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
