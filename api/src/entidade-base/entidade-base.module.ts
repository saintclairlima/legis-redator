import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeBaseAuditavel } from './entidade-base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadeBaseAuditavel])],
  exports:[TypeOrmModule],
})

export class EntidadeBaseModule {}