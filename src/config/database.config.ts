import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.development.env' });
export default registerAs('database', () => ({
  TYPE: process.env.DATABASE_TYPE,
  HOST: process.env.DATABASE_HOST,
  PORT: +process.env.DATABASE_PORT || 5432,
  USERNAME: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE: process.env.DATABASE_NAME,
  ENTITIES: process.env.DATABASE_ENTITIES_PATH,
  SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
}));
