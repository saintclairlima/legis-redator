import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaElementoController } from './referencia-elemento.controller';
import { ReferenciaElementoService } from './referencia-elemento.service';

describe('ReferenciaElementoController', () => {
  let controller: ReferenciaElementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenciaElementoController],
      providers: [ReferenciaElementoService],
    }).compile();

    controller = module.get<ReferenciaElementoController>(ReferenciaElementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
