import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountModule } from '../user/account.module';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '2weeks' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AccountModule),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
