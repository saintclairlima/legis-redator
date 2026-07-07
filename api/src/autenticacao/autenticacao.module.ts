import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { HashService } from 'src/util/hash.service';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { LocalJwtService } from './local-jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '86400s' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    UsuarioModule
  ],
  controllers: [AutenticacaoController],
  providers: [
    AutenticacaoService, 
    HashService,
    LocalJwtService
  ],
  exports: [AutenticacaoService, LocalJwtService]
})
export class AutenticacaoModule {}
