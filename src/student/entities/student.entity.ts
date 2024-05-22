import { Exclude } from 'class-transformer';
import { User } from 'src/common/entities/user.entity';
import { GenderType } from 'src/common/enums';
import { Parent } from 'src/parent/entities/parent.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Student extends User {
  @Column()
  dateOfBirth: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column({ unique: true })
  username: string;

  @ManyToOne(() => Parent, (parent) => parent.students, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  parent: Parent;

  @Column()
  parentId: string;

  @OneToMany(() => Task, (task) => task.assignedStudent, { eager: true })
  @Exclude()
  tasks: Task[];
}
