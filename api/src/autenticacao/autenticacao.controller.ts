import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoDto } from './dto/autenticacao.dto';
import { Publica } from './autenticacao.guard';


@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Publica()
  @Post()
  login(@Body() autenticacaoDto: AutenticacaoDto) {
    return this.autenticacaoService.login(autenticacaoDto);
  }
}
