// src/Materia/Materia.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MateriaController } from './Materia.controller';

describe('MateriaController', () => { 
  let controller: MateriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaController],
    }).compile();

    controller = module.get<MateriaController>(MateriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Materiaes"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Materiaes');
  });

});