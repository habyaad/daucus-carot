
import { User } from 'src/common/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Parent extends User{
    @Column({ unique: true })
    email: string;
  
    @Column({ length: 11, unique: true })
    phoneNumber: string;

    @OneToMany(()=>Student, (student)=>student.parent)
    children: Student[]
}
