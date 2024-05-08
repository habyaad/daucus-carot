import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/common/enums';
import { Exclude } from 'class-transformer';
import { Activation } from 'src/auth/entities/activation.entity';

@Entity()
export class User extends BaseEntity {
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

  @Column()
  activationId: number

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  async validatePassword(checkPassword: string): Promise<boolean> {
    return await bcrypt.compare(checkPassword, this.password);
  }
  isActivated(): boolean {
    console.log(this.activation.code);
    return this.activation.code === null;
  }
}
