import { Test, TestingModule } from '@nestjs/testing';
import { Controlador1Controller } from './controlador1.controller';

describe('Controlador1Controller', () => {
  let controller: Controlador1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Controlador1Controller],
    }).compile();

    controller = module.get<Controlador1Controller>(Controlador1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
