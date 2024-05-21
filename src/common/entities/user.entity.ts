import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/common/enums';
import { Exclude } from 'class-transformer';
import { Activation } from 'src/auth/entities/activation.entity';
import { DateColumn } from './date-column';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Entity()
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: UserType })
  userType: UserType;

  @OneToOne(() => Activation, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @Exclude()
  activation: Activation;

  @OneToOne(() => Subscription, {
    //cascade: true, eager:true
  })
  @Exclude()
  subscription: Subscription;

  @OneToOne(() => Wallet, (wallet) => wallet.user, {
    cascade: true, eager:true
  })
  @JoinColumn()
  @Exclude()
  wallet: Wallet;

  @Column()
  @Exclude()
  password: string;

  @Column(() => DateColumn)
  @Exclude()
  dates: DateColumn;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    //cascade: true, eager:true
  })
  @Exclude()
  transactions: Transaction[];

  async validatePassword(checkPassword: string): Promise<boolean> {
    return await bcrypt.compare(checkPassword, this.password);
  }
  isActivated(): boolean {
    console.log(this.activation.code);
    return this.activation.code === null;
  }
}
