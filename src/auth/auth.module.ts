import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ParentModule } from 'src/parent/parent.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ActivationRepository } from './activation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activation } from './entities/activation.entity';
import { StudentModule } from 'src/student/student.module';
import { AdminModule } from 'src/admin/admin.module';
import { User } from 'src/common/entities/user.entity';
import { config } from 'dotenv';

config();
@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Activation, User]),
    forwardRef(() => ParentModule),
    StudentModule,
    AdminModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: '' + process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10) },
    }),
  ],
  providers: [ActivationRepository, AuthService, JwtStrategy],
  exports: [PassportModule, /*JwtStrategy,*/ ActivationRepository],
})
export class AuthModule {}
