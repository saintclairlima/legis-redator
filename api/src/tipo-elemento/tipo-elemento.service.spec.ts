import { Test, TestingModule } from '@nestjs/testing';
import { TipoElementoService } from './tipo-elemento.service';

describe('TipoElementoService', () => {
  let service: TipoElementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoElementoService],
    }).compile();

    service = module.get<TipoElementoService>(TipoElementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
