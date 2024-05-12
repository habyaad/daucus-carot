import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Parent } from './entities/parent.entity';
import { Student } from 'src/student/entities/student.entity';

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
    return await this.parentService.fetch(parent.id);
  }
 
  @Post('/register/student') 
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerStudent(@GetUser() parent, @Body(ValidationPipe) createStudentDto: CreateStudentDto){
    return await this.parentService.registerStudent(createStudentDto, parent);
  }

  @Get('/students') 
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async fetchStudents(@GetUser() parent){ 
    return await this.parentService.fetchStudents(parent.id);
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
