import { Test, TestingModule } from '@nestjs/testing';
import { ElementoController } from './elemento.controller';
import { ElementoService } from './elemento.service';

describe('ElementoController', () => {
  let controller: ElementoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementoController],
      providers: [ElementoService],
    }).compile();

    controller = module.get<ElementoController>(ElementoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
