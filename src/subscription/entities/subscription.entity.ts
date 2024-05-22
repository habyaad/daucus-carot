import { Exclude } from 'class-transformer';
import { DateColumn } from 'src/common/entities/date-column';
import { User } from 'src/common/entities/user.entity';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => SubscriptionPlan, {eager:true, createForeignKeyConstraints:false})
  @JoinColumn()
  plan: SubscriptionPlan;

  @Column()
  dueDate: Date;

  @OneToOne(() => User, (user) => user.subscription)
  user: User;

  @Column(() => DateColumn)
  dates: DateColumn;

  isActive(): boolean {
    const now: Date = new Date();
    return this.dueDate > now;
  }
}
