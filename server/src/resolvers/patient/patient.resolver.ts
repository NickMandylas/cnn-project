import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Patient } from "@server/entities/patient.entity";
import {
  PatientResponse,
  PatientsResponse,
} from "@server/shared/responses/patient";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import isUUID from "validator/lib/isUUID";

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

    const patient = await em.findOne(Patient, {
      $or: [{ email }, { id: isUUID(id) ? id : "" }],
    });

    if (!patient) {
      return {
        errors: [
          {
            field: "patient",
            message: "Patient could not be found with provided details.",
          },
        ],
      };
    }

    return { patient };
  }

  @Query(() => PatientsResponse, { nullable: true })
  async patients(
    @Arg("firstName", { nullable: true }) firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Ctx() { em }: ServerContext,
  ): Promise<PatientsResponse> {
    const patients = await em.find(Patient, {
      $and: [
        { firstName: { $like: `${firstName}%` } },
        { lastName: { $like: `${lastName}%` } },
      ],
    });

    return { patients };
  }
}
