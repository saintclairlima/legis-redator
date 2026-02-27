import { Test, TestingModule } from '@nestjs/testing';
import { AnotacaoController } from './anotacao.controller';
import { AnotacaoService } from './anotacao.service';

describe('AnotacaoController', () => {
  let controller: AnotacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnotacaoController],
      providers: [AnotacaoService],
    }).compile();

    controller = module.get<AnotacaoController>(AnotacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
