// src/Log/Log.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './Log.controller';

describe('LogController', () => { 
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return "Esta acción devuelve todos los Loges"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los Loges');
  });

});