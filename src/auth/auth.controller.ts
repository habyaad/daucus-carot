import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { LoginDto } from './dto/login-data.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body(ValidationPipe) loginDto: LoginDto){
        return await this.authService.signIn(loginDto);
    }
    @Post('signup')
    async signUp(@Body(ValidationPipe) createParentDto: CreateParentDto): Promise<Parent>{
        return await this.authService.createParent(createParentDto);
    }
}
 