import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT_NO, 10),
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};

export default registerAs('typeorm', () => config);
