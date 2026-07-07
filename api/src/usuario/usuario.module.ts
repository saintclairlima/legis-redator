import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity, UsuarioEntity } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';



@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity, UsuarioEntity])],
  exports:[TypeOrmModule, UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})

export class UsuarioModule {}