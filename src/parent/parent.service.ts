import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { ParentRepository } from './parent.repository';
import { LoginDto } from 'src/auth/dto/login-data.dto';
import { JwtPayloadDto } from 'src/auth/dto/payload.dto';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(ParentRepository)
    private readonly parentRepository: ParentRepository,
  ) {}
  
  async findAll() {
    return await this.parentRepository.find();
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
