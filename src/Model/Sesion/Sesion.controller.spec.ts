// src/Sesion/Sesion.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SesionController } from './Sesion.controller';

describe('SesionController', () => { 
  let controller: SesionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SesionController],
    }).compile();

    controller = module.get<SesionController>(SesionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Sesiones"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Sesiones');
  });

});