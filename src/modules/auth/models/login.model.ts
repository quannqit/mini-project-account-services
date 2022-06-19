import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginModel {
  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  password: string;
}
