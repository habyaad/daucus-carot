import { DateColumn } from 'src/common/entities/date-column';
import { User } from 'src/common/entities/user.entity';
import {
  TaskStatus,
  TransactionCategory,
  TransactionType,
} from 'src/common/enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  reference: string;
  @Column({ enum: TransactionType })
  transactionType: TransactionType;
  @Column()
  amount: number;
  @Column({ enum: TransactionCategory })
  category: TransactionCategory;
  @Column({ nullable: true })
  reason: string;
  @Column()
  narration: string;
  @Column({ enum: TaskStatus })
  status: TaskStatus;
  @Column(() => DateColumn)
  dates: DateColumn;

  @ManyToOne(() => User, user => user.transactions,{cascade:true})
  @JoinColumn()
  user: User;

}
