import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Patient } from "@server/entities/patient.entity";
import { getSignedUrl } from "@server/shared/getFile";
import pathHandler from "@server/shared/pathHandler";
import {
  PatientResponse,
  PatientsResponse,
} from "@server/shared/responses/patient";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Query, Resolver } from "type-graphql";
import isUUID from "validator/lib/isUUID";

@Resolver()
export class PatientResolver {
  @Query(() => PatientResponse, { nullable: true })
  async patient(
    @Arg("email", { nullable: true }) email: string,
    @Arg("id", { nullable: true }) id: string,
    @Ctx() { em, storage }: ServerContext,
    @Info() info: GraphQLResolveInfo,
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

    const relationPaths = pathHandler(info, true);

    const patient = await em.findOne(
      Patient,
      {
        $or: [{ email }, { id: isUUID(id) ? id : "" }],
      },
      { populate: relationPaths },
    );

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

    if (relationPaths.includes("historicals")) {
      for (let i = 0; i < patient.historicals.length; i++) {
        const url = await getSignedUrl(
          storage,
          "cnn-skin-lesion-images",
          patient.historicals[i].scan,
        );

        patient.historicals[i].scan = url[0];
      }
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
        {
          firstName: {
            $like: `${
              !!firstName ? firstName[0].toUpperCase() + firstName.slice(1) : ""
            }%`,
          },
        },
        {
          lastName: {
            $like: `${
              !!lastName ? lastName[0].toUpperCase() + lastName.slice(1) : ""
            }%`,
          },
        },
      ],
    });

    return { patients };
  }
}
