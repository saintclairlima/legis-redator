import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PessoaEntity, SujeitoEntity, UsuarioEntity } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity, SujeitoEntity, UsuarioEntity])],
  exports:[TypeOrmModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})

export class UsuarioModule {}