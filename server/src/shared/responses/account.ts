import { Account } from "@server/entities/account.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class AccountResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Account, { nullable: true })
  account?: Account;
}
