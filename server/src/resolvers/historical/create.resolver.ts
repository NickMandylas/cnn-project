import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { Historical } from "@server/entities/historical.entity";
import { v4 } from "uuid";

const bucketName = "cnn-skin-lesion-images";

@Resolver()
export class CreateHistoricalResolver {
  @Mutation(() => Boolean)
  async createHistorical(
    @Arg("localisation") localisation: string,
    @Arg("variant") variant: string,
    @Arg("scanDate") scanDate: string,
    @Arg("patientId") patientId: string,
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { em, storage }: ServerContext,
  ): Promise<boolean> {
    const uuid = v4();
    const scanName = `${uuid}_${filename}`;

    const dtParts = scanDate.split("/");
    const dt = new Date(
      +dtParts[2],
      Number(dtParts[1]) - 1,
      Number(dtParts[0]),
    );

    new Promise(() =>
      createReadStream()
        .pipe(
          storage.bucket(bucketName).file(scanName).createWriteStream({
            resumable: false,
            gzip: false,
          }),
        )
        .on("error", (err) => {
          console.log(err);
        })
        .on("finish", async () => {
          const historical = em.create(Historical, {
            id: uuid,
            localisation,
            variant,
            scanDate: dt,
            scan: scanName,
            patient: patientId,
          });

          await em.persistAndFlush(historical);
        }),
    );

    return true;
  }
}
