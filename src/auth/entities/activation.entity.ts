import { BadRequestException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { DateColumn } from 'src/common/entities/date-column';
import { User } from 'src/common/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Activation extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  // @OneToOne(() => User, (user) => user.activation)
  // user: User;

  @Column(()=>DateColumn)
  @Exclude()
  dates: DateColumn

  isValid(code: string): boolean {
    const currentTime = new Date();
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000); // 5 minutes ago

    const valid: boolean = this.dates.updatedAt > fiveMinutesAgo;
    if (valid === false || this.code != code) {
      return false;
    }
    return true;
  }
}
