// src/Calificacion/Calificacion.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CalificacionController } from './Calificacion.controller';

describe('CalificacionController', () => { 
  let controller: CalificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalificacionController],
    }).compile();

    controller = module.get<CalificacionController>(CalificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Calificaciones"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Calificaciones');
  });

});