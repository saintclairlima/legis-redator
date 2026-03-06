import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const ambiente_producao: boolean = this.configService.get('NODE_ENV') == 'prod';

    return {
      type: 'mssql',
      host: this.configService.get<string>('DB_HOST'),
      port: Number(this.configService.get<number>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      options: { encrypt: false },
      autoLoadEntities: true,
      logging: !ambiente_producao,
      synchronize: !ambiente_producao,
    };
  }
}

// @Injectable()
// export class DbConfigServiceUsuario implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}
//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: 'mssql',
//       host: this.configService.get<string>('DB_PORTAL_HOST'),
//       port: Number(this.configService.get<number>('DB_PORT')),
//       username: this.configService.get<string>('DB_PORTAL_USERNAME'),
//       password: this.configService.get<string>('DB_PORTAL_PASSWORD'),
//       database: this.configService.get<string>('DB_PORTAL_NAME'),
//       options: { encrypt: false },
//       logging: true,
//       autoLoadEntities: true,
//       synchronize: false,
//     };
//   }
// }

