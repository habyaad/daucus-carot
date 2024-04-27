import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { join } from "path";

config();

export const dbConfigOption: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT_NO, 10),
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USER,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
  }