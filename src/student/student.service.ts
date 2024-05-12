import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Parent } from 'src/parent/entities/parent.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { UserType } from 'src/common/enums';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly taskService: TaskService,
  ) {}
  async fetchStudentById(id: string): Promise<Student> {
    try {
      return await this.studentRepository.findOneBy({ id });
    } catch (err) {
      throw err;
    }
  }
  async fetchStudentByUsername(username: string): Promise<Student> {
    try {
      return await this.studentRepository.findOneBy({ username });
    } catch (err) {
      throw err;
    }
  }
  async fetchAllTasks(id: string): Promise<Task[]> {
    try {
      return await this.taskService.findAllTaskForStudent(id);
    } catch (err) {
      throw err;
    }
  }

  async createStudent(createStudentDto: CreateStudentDto, parent: Parent) {
    try {
      return await this.studentRepository.createStudent(
        createStudentDto,
        parent,
      );
    } catch (err) {
      throw err;
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    studentId: string,
  ): Promise<Task> {
    return await this.taskService.create(createTaskDto, studentId);
  }

  async fetchTaskById(taskId: number, studentId: string): Promise<Task> {
    const task: Task = await this.taskService.findOne(taskId);
    if (task.verifyStudentOwnwership(studentId) === true) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }
  async deleteCreatedTaskById(taskId: number, studentId: string) {
    const task: Task = await this.taskService.findOne(taskId);

    if (
      task.verifyStudentOwnwership(studentId) === true &&
      task.parentId === null
    ) {
      await this.taskService.remove(taskId);
      return { message: `task ${taskId} deleted` };
    } else if (task.parentId != null) {
      throw new BadRequestException(
        'You cannot delete an assigned task, lazy bones!',
      );
    } else {
      throw new NotFoundException();
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    studentId: string,
  ): Promise<Task> {
    return await this.taskService.update(
      id,
      updateTaskDto,
      studentId,
      UserType.Student,
    );
  }
  async markTaskAscomplete(id: number, studentId: string): Promise<Task> {
    return await this.taskService.markAsComplete(id, studentId);
  }
  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
