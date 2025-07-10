// src/Estudiante/Estudiante.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteController } from './Estudiante.controller';

describe('EstudianteController', () => { 
  let controller: EstudianteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudianteController],
    }).compile();

    controller = module.get<EstudianteController>(EstudianteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Estudiantees"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Estudiantees');
  });

});