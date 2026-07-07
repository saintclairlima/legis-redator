import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePermissaoDocumentoDto } from './dto/create-permissao-documento.dto';
import { UpdatePermissaoDocumentoDto } from './dto/update-permissao-documento.dto';
import { PermissaoDocumentoService } from './permissao-documento.service';

@Controller('permissao-documento')
export class PermissaoDocumentoController {
  constructor(private readonly permissaoDocumentoService: PermissaoDocumentoService) {}

  @Post()
  create(@Body() createPermissaoDocumentoDto: CreatePermissaoDocumentoDto) {
    return this.permissaoDocumentoService.create(createPermissaoDocumentoDto);
  }

  @Get()
  findAll() {
    return this.permissaoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissaoDocumentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissaoDocumentoDto: UpdatePermissaoDocumentoDto) {
    return this.permissaoDocumentoService.update(+id, updatePermissaoDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissaoDocumentoService.remove(+id);
  }
}
