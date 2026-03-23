import { Test, TestingModule } from '@nestjs/testing';
import { PermissaoDocumentoService } from './permissao-documento.service';

describe('PermissaoDocumentoService', () => {
  let service: PermissaoDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissaoDocumentoService],
    }).compile();

    service = module.get<PermissaoDocumentoService>(PermissaoDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
