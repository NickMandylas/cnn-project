import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Patient } from "@server/entities/patient.entity";
import isUUID from "validator/lib/isUUID";

@Resolver()
export class DeletePatientResolver {
  @Mutation(() => Boolean)
  async deletePatient(
    @Arg("id") id: string,
    @Ctx() { em }: ServerContext,
  ): Promise<boolean> {
    if (isUUID(id)) {
      await em.nativeDelete(Patient, { id });
      return true;
    }

    return false;
  }
}
