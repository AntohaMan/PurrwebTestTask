import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config({ path: '.development.env' });

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '../../dist/database/entities/*{.js,.ts}')],
  migrations: [join(__dirname, '../../dist/database/migrations/*{.js,.ts}')],
  synchronize: false,
});
export default appDataSource;
