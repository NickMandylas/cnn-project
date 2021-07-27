import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { PatientResponse } from "@server/shared/responses/patient";
import { CreatePatientInput } from "@server/contracts/validation/patient.validator";
import { Patient } from "@server/entities/patient.entity";

@Resolver()
export class CreatePatientResolver {
  @Mutation(() => PatientResponse)
  async createPatient(
    @Arg("data")
    { firstName, lastName, email, sex, dateOfBirth, notes }: CreatePatientInput,
    @Ctx() { em }: ServerContext,
  ): Promise<PatientResponse> {
    const emailInUse = await em.findOne(Patient, { email });

    if (emailInUse) {
      return {
        errors: [
          {
            field: "email",
            message: "Patient already exists with supplied email.",
          },
        ],
      };
    }

    const dtParts = dateOfBirth.split("/");
    const dt = new Date(
      +dtParts[2],
      Number(dtParts[1]) - 1,
      Number(dtParts[0]),
    );

    const patient = em.create(Patient, {
      firstName,
      lastName,
      email,
      sex,
      dateOfBirth: dt,
      notes,
    });

    await em.persistAndFlush(patient);

    return { patient };
  }
}
