import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { TaskStatus, UserType } from 'src/common/enums';
import { Parent } from 'src/parent/entities/parent.entity';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    studentId: string,
    parent?: Parent,
  ): Promise<Task> {
    try {
      const student: Student =
        await this.studentService.fetchStudentById(studentId);
      const { task, description, reward, dueDate } = createTaskDto;
      const newTask: Task = new Task();
      newTask.task = task;
      newTask.description = description;
      newTask.reward = reward;
      newTask.status = TaskStatus.New;
      newTask.parent = parent;
      newTask.assignedStudent = student;
      newTask.dueDate = new Date(dueDate);

      if (parent) {
        if (parent.validateStudent(studentId)) {
        } else {
          throw new BadRequestException(
            'Parent can only create tasks for registered children',
          );
        }
      }
      await newTask.save();
      return newTask;
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task: Task = await this.taskRepository.findOneBy({ id });
      if (task === null) {
        throw new NotFoundException(`Task with id: ${id} not found for user`);
      }

      return task;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: string,
    userType: UserType,
  ): Promise<Task> {
    try {
      const { task, description, reward, dueDate } = updateTaskDto;
      const savedTask: Task = await this.findOne(id);

      if (userType === UserType.Parent) {
        if (savedTask.verifyParentOwnwership(userId) === false) {
          throw new NotFoundException();
        }
      } else {
        if (savedTask.verifyStudentOwnwership(userId) === false) {
          throw new NotFoundException();
        }
        if (savedTask.parentId != null) {
          throw new BadRequestException(
            'Cannot edit a parent task, go carry it out!',
          );
        }
      }
      savedTask.task = task;
      savedTask.description = description;
      savedTask.reward = reward;
      savedTask.dueDate = new Date(dueDate);

      await savedTask.save();
      return savedTask;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    return await this.taskRepository.delete({ id });
  }

  async findAllTaskForStudent(studentId: string): Promise<Task[]> {
    try {
      return await this.taskRepository.findBy({ assignedStudentId: studentId });
    } catch (err) {
      throw err;
    }
  }
  async findAllTaskByParent(parentId: string): Promise<Task[]> {
    try {
      return await this.taskRepository.findBy({ parentId });
    } catch (err) {
      throw err;
    }
  }
  async markAsComplete(id: number, studentId: string): Promise<Task> {
    try {
      const savedTask: Task = await this.findOne(id);
      if (savedTask.verifyStudentOwnwership(studentId) === false) {
        throw new NotFoundException();
      }
      savedTask.completionDate = new Date();
      savedTask.status = TaskStatus.Completed;
      await savedTask.save;
      return savedTask;
    } catch (err) {
      throw err;
    }
  }

  async verifyTaskCompletion(id: number, parentId: string, status: TaskStatus): Promise<Task> {
    try {
      const savedTask: Task = await this.findOne(id);
      if (savedTask.verifyParentOwnwership(parentId) === false) {
        throw new NotFoundException();
      }
      savedTask.status = status;
      await savedTask.save;
      return savedTask;
    } catch (err) {
      throw err;
    }
  }
}
