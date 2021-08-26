import { Check } from "../../entities/check.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./fieldError";

@ObjectType()
export class CheckResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Check, { nullable: true })
  check?: Check;
}

@ObjectType()
export class ChecksResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Check], { nullable: true })
  checks?: Check[];
}
