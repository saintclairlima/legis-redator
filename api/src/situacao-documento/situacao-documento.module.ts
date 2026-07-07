import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SituacaoDocumentoEntity } from './entities/situacao-documento.entity';
import { SituacaoDocumentoController } from './situacao-documento.controller';
import { SituacaoDocumentoService } from './situacao-documento.service';

@Module({
  imports: [TypeOrmModule.forFeature([SituacaoDocumentoEntity])],
  exports:[TypeOrmModule],
  controllers: [SituacaoDocumentoController],
  providers: [SituacaoDocumentoService],
})
export class SituacaoDocumentoModule {}
