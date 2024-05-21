import { config } from "dotenv";
import { DataSource } from "typeorm";

config();
// export default new DataSource({
//     type: 'postgres',
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT_NO, 10),
//     password: process.env.DATABASE_PASSWORD,
//     username: process.env.DATABASE_USER,
//     database: process.env.DATABASE_NAME,
//     entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
//     migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
//     synchronize: false,
//     migrationsTableName:'migrations_TypeORM',
//     });
    export const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT_NO, 10),
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USER,
    });