import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Historical } from "@server/entities/historical.entity";
import { getSignedUrl } from "@server/shared/getFile";
import {
  HistoricalResponse,
  HistoricalsResponse,
} from "@server/shared/responses/historical";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class HistoricalResolver {
  @Query(() => HistoricalResponse, { nullable: true })
  async historical(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<HistoricalResponse> {
    const historical = await em.findOne(Historical, { id });

    if (!historical) {
      return {
        errors: [
          {
            field: "id",
            message: "Historical entity does not exist with provided id.",
          },
        ],
      };
    }

    const url = await getSignedUrl(
      storage,
      "cnn-skin-lesion-images",
      historical.scan,
    );

    historical.scan = url[0];

    return { historical };
  }

  @Query(() => HistoricalsResponse, { nullable: true })
  async historicals(
    @Arg("patientId", { nullable: true }) id: string,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<HistoricalsResponse> {
    const historicals = await em.find(Historical, { patient: id });

    for (let i = 0; i < historicals.length; i++) {
      const url = await getSignedUrl(
        storage,
        "cnn-skin-lesion-images",
        historicals[i].scan,
      );

      historicals[i].scan = url[0];
    }

    return { historicals };
  }
}
