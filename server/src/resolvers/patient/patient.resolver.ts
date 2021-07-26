import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Patient } from "@server/entities/patient.entity";
import { PatientResponse } from "@server/shared/responses/patient";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PatientResolver {
  @Query(() => PatientResponse, { nullable: true })
  async patient(
    @Arg("email", { nullable: true }) email: string,
    @Arg("id", { nullable: true }) id: string,
    @Ctx() { em }: ServerContext,
  ): Promise<PatientResponse> {
    if (id === undefined && email === undefined) {
      return {
        errors: [
          {
            field: "emptyFields",
            message: "You need to search with an ID or email.",
          },
        ],
      };
    }

    let patient: Patient | null;

    if (email) {
      patient = await em.findOne(Patient, { email });
    } else {
      patient = await em.findOne(Patient, { id });
    }

    if (!patient) {
      return {
        errors: [
          {
            field: "email",
            message: "Patient could not be found with provided email.",
          },
        ],
      };
    }

    return { patient };
  }
}
