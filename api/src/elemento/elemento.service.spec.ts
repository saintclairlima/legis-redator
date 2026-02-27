import { Test, TestingModule } from '@nestjs/testing';
import { ElementoService } from './elemento.service';

describe('ElementoService', () => {
  let service: ElementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementoService],
    }).compile();

    service = module.get<ElementoService>(ElementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
