import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  accessToken: string;

  @Field((type) => Date)
  createdAt: Date;
}
