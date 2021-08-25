import { Check } from "@server/entities/check.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

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
