import { Repository } from 'typeorm';
import { Parent } from './entities/parent.entity';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login-data.dto';
import { JwtPayloadDto } from 'src/auth/dto/payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParentRepository extends Repository<Parent> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    private readonly jwtService: JwtService,
  ) {
    super(
      parentRepository.target,
      parentRepository.manager,
      parentRepository.queryRunner,
    );
  }
  
}
