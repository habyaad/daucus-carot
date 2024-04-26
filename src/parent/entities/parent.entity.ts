import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
