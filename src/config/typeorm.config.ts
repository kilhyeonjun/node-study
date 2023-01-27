import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { User } from '../entities/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const { host, port, username, password, database, synchronize, logging } =
      configService.get('typeorm');
    return {
      type: 'mysql',
      host: host || 'localhost',
      port: port || 3306,
      username: username,
      password: password,
      database: database,
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: synchronize || false,
      logging: logging || false,
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
