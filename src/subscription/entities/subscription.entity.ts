import { DateColumn } from 'src/common/entities/date-column';
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

  @OneToOne(() => SubscriptionPlan)
  @JoinColumn()
  plan: SubscriptionPlan;

  @Column()
  dueDate: Date;

  @Column(() => DateColumn)
  dates: DateColumn;

  isActive(): boolean {
    const now: Date = new Date();
    return this.dueDate > now;
  }
}
