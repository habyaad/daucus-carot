import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent) private readonly parentRepository: Repository<Parent>,
  ) {}
  create(createParentDto: CreateParentDto) {
    try{
    const parent: Parent = new Parent();
    parent.firstName = createParentDto.firstName;
    parent.email = createParentDto.email;
    parent.password = createParentDto.password;
    return this.parentRepository.save(parent);  
    }catch(e){
      throw e;
    }
  }
  findAll() {
    return `This action returns all parent`;
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
