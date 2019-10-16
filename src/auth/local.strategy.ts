import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return this.authService.findOneUser(username)
    .then((user) => {
      if (!user) {
        throw new Error('Cannot find user!');
      }
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(password, salt);
      const hash = user.password;
      const validPassword = bcrypt.compareSync(password, hash);
      if (!validPassword) {
        throw new Error('invalid password');
      }

      return user;
    })
    .catch((error) => {
      throw new UnauthorizedException(error.message);
    });
  }
}
