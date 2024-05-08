import { BadRequestException } from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Activation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.activation)
  user: User;

  isValid(code: string): boolean {
    const currentTime = new Date();
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000); // 5 minutes ago

    const valid: boolean = this.updatedAt > fiveMinutesAgo;
    if (valid === false || this.code != code) {
      return false;
    }
    return true;
  }
}
