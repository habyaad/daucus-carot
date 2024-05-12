
import { Exclude } from 'class-transformer';
import { User } from 'src/common/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Parent extends User{
    @Column({ unique: true })
    email: string;
  
    @Column({ length: 11, unique: true })
    phoneNumber: string;

    @OneToMany(()=>Student, (student)=>student.parent, {eager: true})
    @Exclude()
    students: Student[]

    @OneToMany(()=>Task, (task)=>task.parent, {eager: true})
    @Exclude()
    createdTasks: Task[]

    validateStudent(studentId:string): boolean{
        return this.students.some((student: Student) => student.id === studentId);

    }
}
