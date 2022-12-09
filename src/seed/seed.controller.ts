import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedServicio } from './seed.service';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedServicio: SeedServicio) {}

  @Delete()
  ejecutarSeed() {
    return this.seedServicio.ejecutarSeed();
  }

}
