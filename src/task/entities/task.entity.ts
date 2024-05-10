import { DateColumn } from 'src/common/entities/date-column';
import { TaskStatus } from 'src/common/enums';
import { Student } from 'src/student/entities/student.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  task: string;
  @Column()
  description: string;
  @Column()
  reward: string;
  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;
  @Column()
  remarks: string;
  @Column()
  completionDate: string;
  @Column()
  dueDate: string;
  @Column(()=>DateColumn)
  dates: DateColumn
  @ManyToOne(()=>Student, (student)=>student.tasks)
  assignedChild: Student;
}
