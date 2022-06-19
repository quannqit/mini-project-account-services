import * as bcrypt from 'bcrypt';
import { UserSignupDto } from 'src/modules/auth/dtos/user-signup.dto';
import { UserService } from 'src/modules/user/services/user/user.service';

import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const { password: hashedPassword, ...user } =
      await this.userService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      return user;
    }
  }

  signUp(userSignup: UserSignupDto) {
    return this.userService.create(userSignup);
  }
}
