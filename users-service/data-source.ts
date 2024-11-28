import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'effmob',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
