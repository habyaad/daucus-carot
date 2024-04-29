import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { LoginDto } from './dto/login-data.dto';
import { JwtPayloadDto } from './dto/payload.dto';
import { ParentRepository } from 'src/parent/parent.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode } from 'src/common/enums';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly jwtService: JwtService,
  ) {}
  logger: Logger = new Logger('Auth Module');
  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    const { firstName, lastName, email, password, phoneNumber, userType } =
      createParentDto;
    const parent: Parent = new Parent();
    const salt: string = await bcrypt.genSalt();
    parent.firstName = firstName;
    parent.lastName = lastName;
    parent.email = email;
    parent.password = await this.hashPassword(password);
    parent.phoneNumber = phoneNumber;
    parent.userType = userType;

    try {
      return await this.parentRepository.save(parent);
    } catch (error) {
      this.logger.error(error, error.stack);
      if (error.code == PostgresErrorCode.UniqueColumnDuplicateErrorCode) {
        throw new BadRequestException('Phone number/Email exists');
      }
      throw error;
    }
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const parent: Parent = await this.parentRepository.findOneBy({ email });
    if (!parent || (await parent.validatePassword(password)) === false) {
      throw new NotFoundException('Incorrect email/password');
    }
    const payload: JwtPayloadDto = { email };
    return { access_token: await this.jwtService.signAsync(payload), parent };
  }

  async validateUser(payload: JwtPayloadDto): Promise<User> {
    const { email } = payload;
    try {
      const user = await this.parentRepository.findOneBy({ email });
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
