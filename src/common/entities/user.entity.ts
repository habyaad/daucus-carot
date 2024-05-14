import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

export abstract class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: UserType })
  userType: UserType;

  @OneToOne(() => Activation, {
    cascade: true, eager:true
  })
  @JoinColumn()
  @Exclude()
  activation: Activation;

  @OneToOne(() => Subscription, {
    cascade: true, eager:true
  })
  @JoinColumn()
  subscription: Subscription;

  @OneToOne(() => Wallet, {
    cascade: true, eager:true
  })
  @JoinColumn()
  wallet: Wallet;

  @Column()
  @Exclude()
  password: string;

  @Column(()=>DateColumn)
  @Exclude()
  dates: DateColumn

  async validatePassword(checkPassword: string): Promise<boolean> {
    return await bcrypt.compare(checkPassword, this.password);
  }
  isActivated(): boolean {
    console.log(this.activation.code);
    return this.activation.code === null;
  }

}
