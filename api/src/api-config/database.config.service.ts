import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      name: 'default',
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT') as string),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      options: { encrypt: false },
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

@Injectable()
export class DbConfigServiceUsuario implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      name: 'portal-servidor',
      host: this.configService.get<string>('DB_PORTAL_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORTAL_PORT') as string),
      username: this.configService.get<string>('DB_PORTAL_USERNAME'),
      password: this.configService.get<string>('DB_PORTAL_PASSWORD'),
      database: this.configService.get<string>('DB_PORTAL_NAME'),
      options: { encrypt: false },
      logging: true,
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}

