import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => StudentModule)],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {}
