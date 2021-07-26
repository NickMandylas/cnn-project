import { Patient } from "@server/entities/patient.entity";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class PatientResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  patient?: Patient;
}

@ObjectType()
export class PatientsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];
}
