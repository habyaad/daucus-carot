import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Activation } from 'src/auth/entities/activation.entity';
import { PostgresErrorCode, TaskStatus, UserType } from 'src/common/enums';
import { StringUtils } from 'src/common/helpers/string.utils';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Parent } from './entities/parent.entity';
import { ParentRepository } from './parent.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class ParentService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentService: StudentService,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async createParent(createParentDto: CreateParentDto, activation: Activation) {
    const { firstName, lastName, email, password, phoneNumber } =
      createParentDto;

    const parent: Parent = new Parent();
    parent.firstName = firstName;
    parent.lastName = lastName;
    parent.email = email;
    parent.password = await StringUtils.hashPassword(password);
    parent.phoneNumber = phoneNumber;
    parent.userType = UserType.Parent;
    parent.activation = activation;

    try {
      await this.parentRepository.save(parent);
    } catch (error) {
      //this.logger.error(error, error.stack);
      if (error.code == PostgresErrorCode.UniqueColumnDuplicateErrorCode) {
        throw new ConflictException('Phone number/Email exists');
      }
      throw error;
    }
  }

  async fetchById(id: string): Promise<Parent> {
    try {
      return await this.parentRepository.findOneBy({ id });
    } catch (err) {
      throw err;
    }
  }
  async fetchByEmail(email: string): Promise<Parent> {
    try {
      return await this.parentRepository.findOneBy({ email });
    } catch (err) {
      throw err;
    }
  }

  async registerStudent(createStudentDto: CreateStudentDto, parent: Parent) {
    return await this.studentService.createStudent(createStudentDto, parent);
  }

  async fetchStudents(id: string): Promise<Student[]> {
    try {
      const parent: Parent = await this.fetchById(id);
      return parent.students;
    } catch (err) {
      throw err;
    }
  }
  async createTaskForStudent(
    createTaskDto: CreateTaskDto,
    id: string,
    parent: Parent,
  ): Promise<Task> {
    return await this.taskService.create(createTaskDto, id, parent);
  }
  async fetchCreatedTasks(parentId: string): Promise<Task[]> {
    return await this.taskService.findAllTaskByParent(parentId);
  }

  async fetchCreatedTaskById(taskId: number, parentId: string): Promise<Task> {
    const task: Task = await this.taskService.findOne(taskId);
    if (task.verifyParentOwnwership(parentId) === true) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  async deleteCreatedTaskById(taskId: number, parentId: string) {
    const task: Task = await this.taskService.findOne(taskId);

    if (task.verifyParentOwnwership(parentId) === true) {
      await this.taskService.remove(taskId);
      return { message: `task ${taskId} deleted` };
    } else {
      throw new NotFoundException();
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    parentId: string,
  ): Promise<Task> {
    return await this.taskService.update(
      id,
      updateTaskDto,
      parentId,
      UserType.Parent,
    );
  }
  async verifyTask(
    id: number,
    parentId: string,
    status: TaskStatus,
  ): Promise<Task> {
    return await this.taskService.verifyTaskCompletion(id, parentId, status);
  }
  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
