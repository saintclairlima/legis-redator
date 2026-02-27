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

@Module({
  imports: [DocumentoModule, ElementoModule, SituacaoDocumentoModule, SituacaoElementoModule, TipoElementoModule, ReferenciaModule, AnotacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
