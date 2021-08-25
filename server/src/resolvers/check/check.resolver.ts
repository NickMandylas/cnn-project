import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Check } from "@server/entities/check.entity";
import { getSignedUrl } from "@server/shared/getFile";
import { CheckResponse, ChecksResponse } from "@server/shared/responses/check";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class CheckResolver {
  @Query(() => CheckResponse, { nullable: true })
  async check(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<CheckResponse> {
    const check = await em.findOne(Check, { id });

    if (!check) {
      return {
        errors: [
          {
            field: "id",
            message: "Check entity does not exist with provided id.",
          },
        ],
      };
    }

    const url = await getSignedUrl(
      storage,
      "cnn-skin-lesion-images",
      check.scan,
    );

    check.scan = url[0];

    return { check };
  }

  @Query(() => ChecksResponse, { nullable: true })
  async checks(
    @Arg("patientId", { nullable: true }) id: string,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<ChecksResponse> {
    const checks = await em.find(Check, { patient: id });

    for (let i = 0; i < checks.length; i++) {
      const url = await getSignedUrl(
        storage,
        "cnn-skin-lesion-images",
        checks[i].scan,
      );

      checks[i].scan = url[0];
    }

    return { checks };
  }
}
