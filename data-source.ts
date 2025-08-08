import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Bill } from 'src/entities/bill.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'caitlinma',
  password: 'Face2Face!',
  database: 'billbuddy',
  entities: [User, Bill],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
