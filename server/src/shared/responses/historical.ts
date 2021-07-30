import { Historical } from "@server/entities/historical.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class HistoricalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Historical, { nullable: true })
  historical?: Historical;
}
