import { Module, forwardRef } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { ParentRepository } from './parent.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ParentController],
  providers: [ParentService, ParentRepository, JwtService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Parent]), ],
  exports: [ParentService, ParentRepository],
})
export class ParentModule {}
