import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { GenderType } from '../enums/gender.enum';

export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  dateOfBirth: string;

  @IsEmail()
  @Column()
  email: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column()
  password: string;
}
