import { Account } from "../../entities/account.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./fieldError";

@ObjectType()
export class AccountResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Account, { nullable: true })
  account?: Account;
}
