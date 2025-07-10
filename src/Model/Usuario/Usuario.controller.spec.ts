// src/Usuario/Usuario.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './Usuario.controller';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "Esta acción devuelve todos los Usuarioes"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Usuarioes');
  });
});