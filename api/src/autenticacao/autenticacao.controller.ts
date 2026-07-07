import { Body, Controller, Post } from '@nestjs/common';
import { Publica } from './autenticacao.guard';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoDto } from './dto/autenticacao.dto';


@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Publica()
  @Post()
  login(@Body() autenticacaoDto: AutenticacaoDto) {
    return this.autenticacaoService.login(autenticacaoDto);
  }
}
