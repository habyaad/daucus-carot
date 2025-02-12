import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activation } from 'src/auth/entities/activation.entity';
import { PostgresErrorCode, UserType } from 'src/common/enums';
import { StringUtils } from 'src/common/helpers/string.utils';
import { Parent } from 'src/parent/entities/parent.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {
    super(
      studentRepository.target,
      studentRepository.manager,
      studentRepository.queryRunner,
    );
  }
  async createStudent(createStudentDto: CreateStudentDto, parent: Parent) {
    const { firstName, lastName, password, username, gender, dateOfBirth } =
      createStudentDto;

    const activation: Activation = new Activation();
    activation.code = StringUtils.generateActivationCode();
    const wallet: Wallet = new Wallet();
    const student: Student = new Student();
    student.firstName = firstName;
    student.lastName = lastName;
    student.password = await StringUtils.hashPassword(password);
    student.username = username;
    student.userType = UserType.Student;
    student.dateOfBirth = dateOfBirth;
    student.gender = gender;
    student.activation = activation;
    student.parent = parent;
    student.wallet = wallet;
    student.subscription = parent.subscription;

    try {
      await this.studentRepository.save(student);
      return {
        message: 'student account created successfully',
        activationCode: activation.code,
      };
    } catch (error) {
      this.logger.error(error, error.stack);
      if (error.code == PostgresErrorCode.UniqueColumnDuplicateErrorCode) {
        throw new ConflictException('Username exists');
      }
      throw error;
    }
  }
}
