import { Module } from '@nestjs/common';
import { SeedServicio } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  controllers: [SeedController],
  providers: [SeedServicio],
  imports: [ProductosModule]
})
export class SeedModule {}
