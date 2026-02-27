import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnotacaoService } from './anotacao.service';
import { CreateAnotacaoDto } from './dto/create-anotacao.dto';
import { UpdateAnotacaoDto } from './dto/update-anotacao.dto';

@Controller('anotacao')
export class AnotacaoController {
  constructor(private readonly anotacaoService: AnotacaoService) {}

  @Post()
  create(@Body() createAnotacaoDto: CreateAnotacaoDto) {
    return this.anotacaoService.create(createAnotacaoDto);
  }

  @Get()
  findAll() {
    return this.anotacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anotacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnotacaoDto: UpdateAnotacaoDto) {
    return this.anotacaoService.update(+id, updateAnotacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anotacaoService.remove(+id);
  }
}
