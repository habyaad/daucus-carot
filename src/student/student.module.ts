import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(()=>TaskModule) ,
  ],
  exports: [StudentService],
})
export class StudentModule {}
