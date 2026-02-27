import { Test, TestingModule } from '@nestjs/testing';
import { SituacaoDocumentoController } from './situacao-documento.controller';
import { SituacaoDocumentoService } from './situacao-documento.service';

describe('SituacaoDocumentoController', () => {
  let controller: SituacaoDocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituacaoDocumentoController],
      providers: [SituacaoDocumentoService],
    }).compile();

    controller = module.get<SituacaoDocumentoController>(SituacaoDocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
