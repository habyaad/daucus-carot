import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { PostgresErrorCode, UserType } from 'src/common/enums';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { ParentService } from 'src/parent/parent.service';
import { StudentService } from 'src/student/student.service';
import { EntityManager } from 'typeorm';
import { ActivationRepository } from './activation.repository';
import { ActivationDto } from './dto/activate.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginDto } from './dto/login-data.dto';
import { Activation } from './entities/activation.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly parentService: ParentService,
    private readonly activationRepository: ActivationRepository,
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  logger: Logger = new Logger('Auth Module');
  async createParent(createParentDto: CreateParentDto) {
    const activation: Activation = new Activation();
    activation.code = this.activationRepository.generateNewActivationCode();

    try {
      // await this.entityManager.transaction(async (entityManager) => {

      //   // Optionally, you can perform more operations...
      // });
      await this.parentService.createParent(createParentDto, activation);

      return {
        message: 'account created successfully',
        activationCode: activation.code,
      };
    } catch (error) {
      this.logger.error(error, error.stack);
      if (error.code == PostgresErrorCode.UniqueColumnDuplicateErrorCode) {
        throw new ConflictException('Phone number/Email exists');
      }
      throw error;
    }
  }

  async signIn(loginDto: LoginDto) {
    const { email, password, userType, username } = loginDto;

    const key: string = userType === UserType.Parent ? email : username;
    const user: User = await this.fetchUser(loginDto);
    if (
      user.isActivated() === false ||
      (await user.validatePassword(password)) === false
    ) {
      throw new NotFoundException('Incorrect details');
    }
    const payload: JwtPayloadDto = { key, userType };
    return { access_token: await this.jwtService.signAsync(payload), user };
  }

  async validateUser(payload: JwtPayloadDto): Promise<User> {
    const { key, userType } = payload;
    let user: User;
    try {
      if (userType === UserType.Parent) {
        user = await this.parentService.fetchByEmail(key);
      } else {
        user = await this.studentService.fetchStudentByUsername(key);
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async fetchActivationDetails(loginDto: LoginDto): Promise<Activation> {
    try {
      const user: User = await this.fetchUser(loginDto);
      if (user.activation.code === null) {
        throw new BadRequestException('Account has been activated before');
      }
      user.activation.code =
        this.activationRepository.generateNewActivationCode();

      await user.activation.save();
      return user.activation;
    } catch (err) {
      throw err;
    }
  }

  async fetchUser(loginDto: LoginDto): Promise<User> {
    const { email, password, userType, username } = loginDto;

    let user: User;
    try {
      if (userType === UserType.Parent) {
        user = await this.parentService.fetchByEmail(email);
      } else {
        user = await this.studentService.fetchStudentByUsername(username);
      }
      if (!user || (await user.validatePassword(password)) === false) {
        throw new NotFoundException('Incorrect details');
      }
      return user;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async activate(activationDto: ActivationDto): Promise<User> {
    const { email, code, userType, username } = activationDto;
    const key: string = userType === UserType.Parent ? email : username;

    try {
      const user: User = await this.validateUser({ key, userType });
      if (user.activation.code === null) {
        throw new BadRequestException('Account has been activated before');
      }
      if (user.activation.isValid(code)) {
        user.activation.code = null;
        await user.activation.save();

        return user;
      } else {
        throw new BadRequestException('Activation code error');
      }
    } catch (err) {
      throw err;
    }
  }
}
