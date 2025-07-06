// src/Solicitud/Solicitud.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './Solicitud.controller';

describe('SolicitudController', () => { 
  let controller: SolicitudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
    }).compile();

    controller = module.get<SolicitudController>(SolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Solicitudes"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Solicitudes');
  });

});