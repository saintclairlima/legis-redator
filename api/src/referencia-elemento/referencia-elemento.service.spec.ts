import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaElementoService } from './referencia-elemento.service';

describe('ReferenciaElementoService', () => {
  let service: ReferenciaElementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenciaElementoService],
    }).compile();

    service = module.get<ReferenciaElementoService>(ReferenciaElementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
