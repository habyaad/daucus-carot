import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';
import { Parent } from './entities/parent.entity';
import { ParentService } from './parent.service';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { VerifyTaskDto } from 'src/task/dto/verify-task.dto';

@Controller('parent')
@ApiTags('Parent')
@ApiBearerAuth()
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get()
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchParent(@GetUser() parent): Promise<Parent> {
    console.log(parent);
    return await this.parentService.fetchById(parent.id);
  }

  @Post('/register/student')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerStudent(
    @GetUser() parent,
    @Body(ValidationPipe) createStudentDto: CreateStudentDto,
  ) {
    return await this.parentService.registerStudent(createStudentDto, parent);
  }

  @Get('/students')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchStudents(@GetUser() parent) {
    return await this.parentService.fetchStudents(parent.id);
  }

  @Post('/task/:studentId')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTask(
    @GetUser() parent,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @Param('studentId') id: string,
  ): Promise<Task> {
    return await this.parentService.createTaskForStudent(
      createTaskDto,
      id,
      parent,
    );
  }

  @Get('/tasks')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchTasks(@GetUser() parent): Promise<Task[]> {
    return await this.parentService.fetchCreatedTasks(parent.id);
  }
  @Get('/task/:taskId')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchTask(
    @GetUser() parent,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.parentService.fetchCreatedTaskById(id, parent.id);
  }

  @Delete('/task/:taskId')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTask(@GetUser() parent, @Param('taskId') id: number) {
    return await this.parentService.deleteCreatedTaskById(id, parent.id);
  }

  @Put('/task/:taskId')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTask(
    @GetUser() parent,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.parentService.updateTask(id, updateTaskDto, parent.id);
  }

  @Patch('/task/:taskId/verify')
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async verifyTask(
    @GetUser() parent,
    @Body(ValidationPipe) VerifyTaskDto: VerifyTaskDto,
    @Param('taskId') id: number,
  ): Promise<Task> {
    return await this.parentService.updateTask(
      id,
      parent.id,
      VerifyTaskDto.status,
    );
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
  //   return this.parentService.update(+id, updateParentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parentService.remove(+id);
  // }
}
