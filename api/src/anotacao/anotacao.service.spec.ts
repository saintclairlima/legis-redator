import { Test, TestingModule } from '@nestjs/testing';
import { AnotacaoService } from './anotacao.service';

describe('AnotacaoService', () => {
  let service: AnotacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnotacaoService],
    }).compile();

    service = module.get<AnotacaoService>(AnotacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
