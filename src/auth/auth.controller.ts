import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    signIn(){
        return 'sign in';
    }
    @Post('sign-up')
    async signUp(@Body(ValidationPipe) createParentDto: CreateParentDto): Promise<Parent>{
        return await this.authService.createParentAccount(createParentDto);
    }
}
 