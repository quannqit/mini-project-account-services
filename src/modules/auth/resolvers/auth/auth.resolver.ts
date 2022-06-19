import { validate } from 'class-validator';
import { UserSignupDto } from 'src/modules/auth/dtos/user-signup.dto';
import { UserModel } from 'src/modules/auth/models/user.model';

import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { GqlAuthGuard } from '../../auth-guards/gql.auth-guard';
import { LoginModel } from '../../models/login.model';
import { AuthService } from '../../services/auth/auth.service';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserModel)
  async signUp(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ) {
    const userSignup = new UserSignupDto();
    userSignup.email = email;
    userSignup.password = password;
    const errors = await validate(userSignup);

    if (errors.length > 0) {
      const errorsResponse: any = errors.map((val: any) => {
        return Object.values(val.constraints)[0] as string;
      });
      throw new BadRequestException(errorsResponse.join(','));
    }

    const user = await this.authService.signUp(userSignup);

    return {
      ...user,
      accessToken: this.jwtService.sign({ ...user }),
    };
  }

  @Query(() => UserModel)
  async login(@Args('credentials') { email, password }: LoginModel) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      ...user,
      accessToken: this.jwtService.sign({ ...user }),
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Boolean)
  async logout(@Context('req') request: any) {
    const token = request.headers['authorization'];
    // TODO: add token to blocklist
    return true;
  }
}
