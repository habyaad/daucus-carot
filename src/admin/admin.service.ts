import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}
  async create(createAdminDto: CreateAdminDto) {
    if (createAdminDto.secretKey != process.env.ADMIN_SECRET) {
      throw new BadRequestException('You cannot create an admin account');
    } else {
      return await this.adminRepository.createAdmin(createAdminDto);
    }
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }
  async findOneByEmail(email: string): Promise<Admin> {
    const admin: Admin = await this.adminRepository.findOneBy({ email });
    if (!admin) {
      throw new NotFoundException();
    }
    return admin;
  }
  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
