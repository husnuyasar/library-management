import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  synchronize: false, 
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  migrationsTableName: "migrations"
});
