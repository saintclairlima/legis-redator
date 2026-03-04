import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentoModule } from './documento/documento.module';
import { ElementoModule } from './elemento/elemento.module';
import { SituacaoDocumentoModule } from './situacao-documento/situacao-documento.module';
import { SituacaoElementoModule } from './situacao-elemento/situacao-elemento.module';
import { TipoElementoModule } from './tipo-elemento/tipo-elemento.module';
import { ReferenciaModule } from './referencia/referencia.module';
import { AnotacaoModule } from './anotacao/anotacao.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService, DbConfigServiceUsuario } from './api-config/database.config.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      useClass: DbConfigService,
    }),
    DocumentoModule, ElementoModule, SituacaoDocumentoModule, SituacaoElementoModule, TipoElementoModule, ReferenciaModule, AnotacaoModule, UsuarioModule],
  controllers: [AppController],
  providers: [
    AppService,
    DbConfigService,
    DbConfigServiceUsuario,
  ],
})
export class AppModule {}
