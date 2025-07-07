// src/Tutor/tutor.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TutorController } from './Tutor.controller';

describe('TutorController', () => {
  let controller: TutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorController],
    }).compile();

    controller = module.get<TutorController>(TutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "Esta acción devuelve todos los tutores"', () => {
    expect(controller.findAll()).toBe('Esta acción devuelve todos los tutores');
  });
});
