import { User } from 'src/common/entities/user.entity';
import { GenderType } from 'src/common/enums';
import { Parent } from 'src/parent/entities/parent.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student extends User{
  
  @Column()
  dateOfBirth: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column({unique: true})
  username: string;

  @ManyToOne(()=>Parent, (parent)=>parent.children, {cascade: true})
  @JoinColumn()
  parent: Parent
}
