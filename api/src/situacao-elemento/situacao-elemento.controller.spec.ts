import { Test, TestingModule } from '@nestjs/testing';
import { SituacaoElementoController } from './situacao-elemento.controller';
import { SituacaoElementoService } from './situacao-elemento.service';

describe('SituacaoElementoController', () => {
  let controller: SituacaoElementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituacaoElementoController],
      providers: [SituacaoElementoService],
    }).compile();

    controller = module.get<SituacaoElementoController>(SituacaoElementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
