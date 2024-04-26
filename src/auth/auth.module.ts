import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ParentModule } from 'src/parent/parent.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ParentModule]
})
export class AuthModule {

}
