import { Module, forwardRef } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { ParentRepository } from './parent.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  controllers: [ParentController],
  providers: [ParentService, ParentRepository, JwtService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Parent]), StudentModule],
  exports: [ParentService, ParentRepository],
})
export class ParentModule {}
