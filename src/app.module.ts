import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/user/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      autoSchemaFile: true,
    }),
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}
