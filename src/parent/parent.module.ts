import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { TaskModule } from 'src/task/task.module';
import { Parent } from './entities/parent.entity';
import { ParentController } from './parent.controller';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  controllers: [ParentController],
  providers: [ParentService, ParentRepository, JwtService],
  imports: [
    TypeOrmModule.forFeature([Parent]),
    StudentModule,
    forwardRef(()=>TaskModule) ,
  ],
  exports: [ParentService],
})
export class ParentModule {}
