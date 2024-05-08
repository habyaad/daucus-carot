import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { ParentRepository } from './parent.repository';
import { LoginDto } from 'src/auth/dto/login-data.dto';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { StudentRepository } from 'src/student/student.repository';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { User } from 'src/common/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class ParentService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async fetch(id: string): Promise<Parent> {
    return await this.parentRepository.findOneBy({ id });
  }

  async registerChild(createStudentDto: CreateStudentDto, parent: Parent) {
    return await this.studentRepository.createStudent(createStudentDto, parent);
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
