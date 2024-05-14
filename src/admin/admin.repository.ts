import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Activation } from 'src/auth/entities/activation.entity';
import { StringUtils } from 'src/common/helpers/string.utils';
import { PostgresErrorCode, UserType } from 'src/common/enums';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminRepository extends Repository<Admin> {
 logger: Logger = new Logger();
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: AdminRepository,
  ) {
    super(
      adminRepository.target,
      adminRepository.manager,
      adminRepository.queryRunner,
    );
  }
  async createAdmin(createAdminDto: CreateAdminDto) {
    const { firstName, lastName, password, email, phoneNumber } =
    createAdminDto;

    const activation: Activation = new Activation();
    activation.code = StringUtils.generateActivationCode();

    const admin: Admin = new Admin();
    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.email = email;
    admin.phoneNumber = phoneNumber;
    admin.password = await StringUtils.hashPassword(password);
    admin.userType = UserType.Admin;
    admin.activation = activation;

    try {
      await this.adminRepository.save(admin);
      return {
        message: 'admin account created successfully',
        activationCode: activation.code,
      };
    } catch (error) {
      this.logger.error(error, error.stack);
      if (error.code == PostgresErrorCode.UniqueColumnDuplicateErrorCode) {
        throw new ConflictException('email exists');
      }
      throw error;
    }
  }
}
