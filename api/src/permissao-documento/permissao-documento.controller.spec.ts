import { Test, TestingModule } from '@nestjs/testing';
import { PermissaoDocumentoController } from './permissao-documento.controller';
import { PermissaoDocumentoService } from './permissao-documento.service';

describe('PermissaoDocumentoController', () => {
  let controller: PermissaoDocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissaoDocumentoController],
      providers: [PermissaoDocumentoService],
    }).compile();

    controller = module.get<PermissaoDocumentoController>(PermissaoDocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
