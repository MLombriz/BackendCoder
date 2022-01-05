import { Test, TestingModule } from '@nestjs/testing';
import { Desafio45Controller } from './desafio45.controller';

describe('Desafio45Controller', () => {
  let controller: Desafio45Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Desafio45Controller],
    }).compile();

    controller = module.get<Desafio45Controller>(Desafio45Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
