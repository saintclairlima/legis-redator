import { Injectable } from '@nestjs/common';
import { CreatePermissaoDocumentoDto } from './dto/create-permissao-documento.dto';
import { UpdatePermissaoDocumentoDto } from './dto/update-permissao-documento.dto';

@Injectable()
export class PermissaoDocumentoService {
  create(createPermissaoDocumentoDto: CreatePermissaoDocumentoDto) {
    return 'This action adds a new permissaoDocumento';
  }

  findAll() {
    return `This action returns all permissaoDocumento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissaoDocumento`;
  }

  update(id: number, updatePermissaoDocumentoDto: UpdatePermissaoDocumentoDto) {
    return `This action updates a #${id} permissaoDocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissaoDocumento`;
  }
}
