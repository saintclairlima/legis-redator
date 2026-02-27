import { Test, TestingModule } from '@nestjs/testing';
import { SituacaoElementoService } from './situacao-elemento.service';

describe('SituacaoElementoService', () => {
  let service: SituacaoElementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituacaoElementoService],
    }).compile();

    service = module.get<SituacaoElementoService>(SituacaoElementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
