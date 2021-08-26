import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { ServerContext } from "../../contracts/interfaces/serverContext";
import { LoginInput } from "../../contracts/validation/account.validator";
import { Account } from "../../entities/account.entity";
import { AccountResponse } from "../../shared/responses/account";

@Resolver()
export class LoginResolver {
  @Mutation(() => AccountResponse)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { em, req }: ServerContext,
  ): Promise<AccountResponse> {
    const account = await em.findOne(Account, { email });

    if (!account) {
      return {
        errors: [
          {
            field: "emailOrPassword",
            message: "Email or password is incorrect",
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, account.password);
    console.log(valid);

    if (!valid) {
      return {
        errors: [
          {
            field: "emailOrPassword",
            message: "Email or password is incorrect",
          },
        ],
      };
    }

    req.session.accountId = account.id;

    return { account };
  }
}
