import { ServerContext } from "../../contracts/interfaces/serverContext";
import { Account } from "../../entities/account.entity";
import { AccountResponse } from "../../shared/responses/account";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class AccountResolver {
  @Query(() => AccountResponse, { nullable: true })
  async account(@Ctx() { req, em }: ServerContext): Promise<AccountResponse> {
    if (!req.session.accountId) {
      return {
        errors: [
          {
            field: "session",
            message: "Account data could not be found for this session.",
          },
        ],
      };
    }

    const account = await em.findOne(Account, { id: req.session.accountId });

    if (!account) {
      return {
        errors: [
          {
            field: "session",
            message: "Account entity no longer exists with associated session.",
          },
        ],
      };
    }

    return { account };
  }
}
