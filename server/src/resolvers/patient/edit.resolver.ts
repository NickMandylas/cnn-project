import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ServerContext } from "../../contracts/interfaces/serverContext";
import { PatientResponse } from "../../shared/responses/patient";
import { EditPatientInput } from "../../contracts/validation/patient.validator";
import { Patient } from "../../entities/patient.entity";

@Resolver()
export class EditPatientResolver {
  @Mutation(() => PatientResponse)
  async editPatient(
    @Arg("data")
    {
      id,
      firstName,
      lastName,
      email,
      sex,
      dateOfBirth,
      notes,
    }: EditPatientInput,
    @Ctx() { em }: ServerContext,
  ): Promise<PatientResponse> {
    const patient = await em.findOne(Patient, { id });

    if (!patient) {
      return {
        errors: [
          {
            field: "id",
            message: "Could not find patient with provided ID",
          },
        ],
      };
    }

    if (patient.email !== email) {
      const emailCheck = await em.findOne(Patient, { email });

      if (emailCheck) {
        return {
          errors: [
            {
              field: "email",
              message: "Email is already being used by another patient.",
            },
          ],
        };
      }
    }

    const dtParts = dateOfBirth.split("/");
    const dt = new Date(
      +dtParts[2],
      Number(dtParts[1]) - 1,
      Number(dtParts[0]),
    );

    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.email = email;
    patient.sex = sex;
    patient.dateOfBirth = dt;
    patient.notes = notes;

    await em.persistAndFlush(patient);

    return { patient };
  }
}
