import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Student } from './entities/student.entity';

@Controller('student')
@ApiTags('Student')
@ApiBearerAuth()

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get() 
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchParent(@GetUser() student): Promise<Student> {
    console.log(student);
    return await this.studentService.fetchUserById(student.id);
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
