import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { LoginDto } from './dto/login-data.dto';
import { ApiTags } from '@nestjs/swagger';
import { Activation } from './entities/activation.entity';
import { ActivationDto } from './dto/activate.dto';
import { User } from 'src/common/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body(ValidationPipe) loginDto: LoginDto){
        return await this.authService.signIn(loginDto);
    }
    @Post('signup')
    async signUp(@Body(ValidationPipe) createParentDto: CreateParentDto){
        return await this.authService.createParent(createParentDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('code')
    async fetchCode(@Body(ValidationPipe) loginDto: LoginDto): Promise<Activation>{
        return await this.authService.fetchActivationDetails(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('activate')
    async activate(@Body(ValidationPipe) activationDto: ActivationDto): Promise<User>{
        return await this.authService.activate(activationDto);
    }
}
 