// src/Coordinador/Coordinador.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CoordinadorController } from './Coordinador.controller';

describe('CoordinadorController', () => { 
  let controller: CoordinadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinadorController],
    }).compile();

    controller = module.get<CoordinadorController>(CoordinadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los coordinadores"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los coordinadores');
  });

});