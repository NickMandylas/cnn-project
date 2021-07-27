import { IsEmail, IsUUID, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

type SexType = "Male" | "Female";

@InputType()
export class CreatePatientInput {
  @Field()
  @Length(1, 255, { message: "First name is too small." })
  firstName: string;

  @Field()
  @Length(1, 255, { message: "Second name is too small" })
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  dateOfBirth: string;

  @Field()
  sex: SexType;

  @Field({ nullable: true })
  notes: string;
}

@InputType()
export class EditPatientInput {
  @Field()
  @IsUUID("4")
  id: string;

  @Field()
  @Length(1, 255, { message: "First name is too small." })
  firstName: string;

  @Field()
  @Length(1, 255, { message: "Second name is too small" })
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  dateOfBirth: string;

  @Field()
  sex: SexType;

  @Field({ nullable: true })
  notes: string;
}
