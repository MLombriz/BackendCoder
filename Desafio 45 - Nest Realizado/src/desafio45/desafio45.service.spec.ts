import { Test, TestingModule } from '@nestjs/testing';
import { Desafio45Service } from './desafio45.service';

describe('Desafio45Service', () => {
  let service: Desafio45Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Desafio45Service],
    }).compile();

    service = module.get<Desafio45Service>(Desafio45Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
