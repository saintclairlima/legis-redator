import { Test, TestingModule } from '@nestjs/testing';
import { SituacaoDocumentoService } from './situacao-documento.service';

describe('SituacaoDocumentoService', () => {
  let service: SituacaoDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituacaoDocumentoService],
    }).compile();

    service = module.get<SituacaoDocumentoService>(SituacaoDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
