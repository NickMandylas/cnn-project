import { Historical } from "../../entities/historical.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./fieldError";

@ObjectType()
export class HistoricalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Historical, { nullable: true })
  historical?: Historical;
}

@ObjectType()
export class HistoricalsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Historical], { nullable: true })
  historicals?: Historical[];
}
