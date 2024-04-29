import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/common/enums';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({length:11, unique: true})
  phoneNumber: string;

  @Column({type: 'enum', enum: UserType}) 
  userType: UserType;

  @Column()
  @Exclude()
  password: string;


  async validatePassword(checkPassword:string): Promise<boolean>{
    return await bcrypt.compare(checkPassword, this.password) 
  }
}
