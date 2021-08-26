import { Ctx, Mutation, Resolver } from "type-graphql";
import { ServerContext } from "../../contracts/interfaces/serverContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ServerContext): Promise<boolean> {
    return new Promise((res, rej) => {
      ctx.req.destroySession((err) => {
        if (err) {
          return rej(false);
        }

        ctx.res.clearCookie("sid");
        return res(true);
      });
    });
  }
}
