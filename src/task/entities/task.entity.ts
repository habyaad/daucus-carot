import { Exclude } from 'class-transformer';
import { DateColumn } from 'src/common/entities/date-column';
import { TaskStatus } from 'src/common/enums';
import { Parent } from 'src/parent/entities/parent.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  task: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  reward: number;
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.New })
  status: TaskStatus;
  @Column({ nullable: true })
  remarks: string;
  @Column({ nullable: true })
  completionDate: Date;
  @Column()
  dueDate: Date;
  @Column(() => DateColumn)
  dates: DateColumn;

  @Column()
  assignedStudentId: string;

  @Exclude()
  @ManyToOne(() => Student, (student) => student.tasks, { cascade: true })
  assignedStudent: Student;

  @Column({ nullable: true })
  parentId: string;

  @Exclude()
  @ManyToOne(() => Parent, (parent) => parent.createdTasks, { cascade: true })
  parent: Parent;

  verifyParentOwnwership(parentId: string): boolean {
    return this.parentId === parentId;
  }
  verifyStudentOwnwership(studentId: string): boolean {
    return this.assignedStudentId === studentId;
  }
  isDue(){
    const currentDate = new Date();
    return currentDate > this.dueDate;
  }
}
