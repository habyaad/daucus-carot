import { Repository } from 'typeorm';
import { Parent } from './entities/parent.entity';
import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParentRepository extends Repository<Parent> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {
    super(
      parentRepository.target,
      parentRepository.manager,
      parentRepository.queryRunner,
    );
  }
  
}
