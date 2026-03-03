import { Module } from '@nestjs/common';
import { SituacaoDocumentoService } from './situacao-documento.service';
import { SituacaoDocumentoController } from './situacao-documento.controller';
import { SituacaoDocumentoEntity } from './entities/situacao-documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SituacaoDocumentoEntity])],
  exports:[TypeOrmModule],
  controllers: [SituacaoDocumentoController],
  providers: [SituacaoDocumentoService],
})
export class SituacaoDocumentoModule {}
