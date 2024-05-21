import { DateColumn } from 'src/common/entities/date-column';
import { User } from 'src/common/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: 0 })
  balance: number;
  
  @OneToOne(() => User, (user) => user.wallet)
  user: User;

  // @Column()
  // userId: string;

  @Column(() => DateColumn)
  dates: DateColumn;
}
