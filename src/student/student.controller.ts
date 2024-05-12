import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Student } from './entities/student.entity';
import { Task } from 'src/task/entities/task.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Controller('student')
@ApiTags('Student')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchParent(@GetUser() student): Promise<Student> {
    return await this.studentService.fetchStudentById(student.id);
  }

  @Get('/tasks')
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchTasks(@GetUser() student): Promise<Task[]> {
    return await this.studentService.fetchAllTasks(student.id);
  }

  @Post('/task')
  @ApiOperation({ summary: 'Reward field is optional' })
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTask(
    @GetUser() student,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.studentService.createTask(createTaskDto, student.id);
  }

  @Get('/tasks/:taskId')
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchTask(
    @GetUser() student,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.studentService.fetchTaskById(id, student.id);
  }
  @Delete('/tasks/:taskId')
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTask(@GetUser() student, @Param('taskId') id: number) {
    return await this.studentService.deleteCreatedTaskById(id, student.id);
  }

  @Put('/tasks/:taskId')
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTask(
    @GetUser() student,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.studentService.updateTask(id, updateTaskDto, student.id);
  }

  @Patch('/tasks/:taskId/complete')
  @Roles('student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markTaskAsComplete(
    @GetUser() student,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.studentService.markTaskAscomplete(id, student.id);
  }
  // @Get()
  // findAll() {
  //   return this.studentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
  //   return this.studentService.update(+id, updateStudentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentService.remove(+id);
  // }
}
