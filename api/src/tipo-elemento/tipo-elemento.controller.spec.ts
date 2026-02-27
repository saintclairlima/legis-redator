import { Test, TestingModule } from '@nestjs/testing';
import { TipoElementoController } from './tipo-elemento.controller';
import { TipoElementoService } from './tipo-elemento.service';

describe('TipoElementoController', () => {
  let controller: TipoElementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoElementoController],
      providers: [TipoElementoService],
    }).compile();

    controller = module.get<TipoElementoController>(TipoElementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
