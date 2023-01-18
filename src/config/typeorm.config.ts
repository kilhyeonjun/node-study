import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { User } from '../entities/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('TYPEORM_HOST') || 'localhost',
      port: configService.get('TYPEORM_PORT') || 3306,
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE') || false,
      logging: configService.get<LoggerOptions>('TYPEORM_LOGGING') || false,
      keepConnectionAlive: true,
      entities: [User],
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
