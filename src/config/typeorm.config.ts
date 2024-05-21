import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('database.HOST'),
    port: +configService.get('database.PORT'),
    username: configService.get('database.USERNAME'),
    password: configService.get('database.PASSWORD'),
    database: configService.get('database.DATABASE'),
    entities: [join(__dirname, '../database/entities/*{.js,.ts}')],
    migrations: [join(__dirname, '../database/migrations/*{.js,.ts}')],
    synchronize: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
