import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Указываем новое имя таблицы
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  issues: boolean;
}

