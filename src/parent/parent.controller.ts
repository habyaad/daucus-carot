import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get() 
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@GetUser() parent) {
    return await this.parentService.findAll();
  }
 
  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
