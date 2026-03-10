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

  // @Post()
  // create(@Body() createAutenticacaoDto: CreateAutenticacaoDto) {
  //   return this.autenticacaoService.create(createAutenticacaoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.autenticacaoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.autenticacaoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAutenticacaoDto: UpdateAutenticacaoDto) {
  //   return this.autenticacaoService.update(+id, updateAutenticacaoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.autenticacaoService.remove(+id);
  // }
}
