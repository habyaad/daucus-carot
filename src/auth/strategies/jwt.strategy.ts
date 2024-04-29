import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/payload.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { User } from 'src/common/entities/user.entity';

config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    console.log(payload);
    return await this.authService.validateUser(payload);
  }
}
