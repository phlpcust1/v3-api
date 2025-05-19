import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const { role } = req.body;

    const user = await this.authService.validateUser(username, password, role);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
