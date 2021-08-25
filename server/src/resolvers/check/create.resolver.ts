import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import axios from "axios";
import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { v4 } from "uuid";
import { Check } from "@server/entities/check.entity";
import { CheckResponse } from "@server/shared/responses/check";
import { getSignedUrl } from "@server/shared/getFile";

const bucketName = "cnn-skin-lesion-images";

type PredictionResults = {
  confidence: string;
  variant: string;
};

@Resolver()
export class CreateCheckResolver {
  @Mutation(() => CheckResponse)
  async createCheck(
    @Arg("localisation") localisation: string,
    @Arg("patientId") patientId: string,
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<CheckResponse> {
    const uuid = v4();
    const scanName = `checks/${uuid}_${filename}`;

    console.log(localisation, patientId, uuid);

    const prediction = new Promise((resolve, reject) =>
      createReadStream()
        .pipe(
          storage.bucket(bucketName).file(scanName).createWriteStream({
            resumable: false,
            gzip: false,
          }),
        )
        .on("error", (err) => {
          reject(err);
        })
        .on("finish", async () => {
          const res = await axios.post(
            "https://australia-southeast1-cnn-project-321314.cloudfunctions.net/lesion-check-pub",
            JSON.stringify({ model: "basic_model.h5", image: scanName }),
            { headers: { "Content-Type": "application/json; charset=utf-8" } },
          );

          resolve(res.data);
        }),
    );

    const results = (await prediction) as PredictionResults;

    const check = em.create(Check, {
      id: uuid,
      confidence: results.confidence,
      variant: results.variant,
      localisation,
      patient: patientId,
      scan: scanName,
      scanDate: new Date(),
    });

    await em.persistAndFlush(check);

    const url = await getSignedUrl(
      storage,
      "cnn-skin-lesion-images",
      check.scan,
    );

    check.scan = url[0];

    return { check };
  }
}
