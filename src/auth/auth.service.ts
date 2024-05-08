import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { LoginDto } from './dto/login-data.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ParentRepository } from 'src/parent/parent.repository';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode, UserType } from 'src/common/enums';
import { User } from 'src/common/entities/user.entity';
import { ActivationRepository } from './activation.repository';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Activation } from './entities/activation.entity';
import { ActivationDto } from './dto/activate.dto';
import { StringUtils } from 'src/common/helpers/string.utils';
import { StudentRepository } from 'src/student/student.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly activationRepository: ActivationRepository,
    private readonly studentRepository: StudentRepository,
    private readonly jwtService: JwtService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  logger: Logger = new Logger('Auth Module');
  async createParent(createParentDto: CreateParentDto) {
    const { firstName, lastName, email, password, phoneNumber, userType } =
      createParentDto;

    const activation: Activation = new Activation();
    activation.code = this.activationRepository.generateNewActivationCode();

    const parent: Parent = new Parent();
    parent.firstName = firstName;
    parent.lastName = lastName;
    parent.email = email;
    parent.password = await StringUtils.hashPassword(password);
    parent.phoneNumber = phoneNumber;
    parent.userType = userType;
    parent.activation = activation;

    try {
      // await this.entityManager.transaction(async (entityManager) => {

      //   // Optionally, you can perform more operations...
      // });
      await this.parentRepository.save(parent);

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
    if (user.isActivated() === false) {
      throw new NotFoundException('Incorrect details');
    }
    const payload: JwtPayloadDto = { key, userType };
    user.activationId;
    return { access_token: await this.jwtService.signAsync(payload), user };
  }

  async validateUser(payload: JwtPayloadDto): Promise<User> {
    const { key, userType } = payload;
    let user: User;
    try {
      if (userType === UserType.Parent) {
        user = await this.parentRepository.findOneBy({ email: key });
      } else {
        user = await this.studentRepository.findOneBy({ username: key });
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
      user.save();
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
        user = await this.parentRepository.findOneBy({ email });
      } else {
        user = await this.studentRepository.findOneBy({ username });
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
        user.save();
        return user;
      } else {
        throw new BadRequestException('Activation code error');
      }
    } catch (err) {
      throw err;
    }
  }
}
