import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { ServerContext } from "../../contracts/interfaces/serverContext";
import { RegisterInput } from "../../contracts/validation/account.validator";
import { Account } from "../../entities/account.entity";
import { AccountResponse } from "../../shared/responses/account";

@Resolver()
export class RegisterResolver {
  @Mutation(() => AccountResponse)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput,
    @Ctx() { em, req }: ServerContext,
  ): Promise<AccountResponse> {
    const emailInUse = await em.findOne(Account, { email });

    if (emailInUse) {
      return {
        errors: [
          {
            field: "emailOrPassword",
            message: "Email or password is incorrect",
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = em.create(Account, {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await em.persistAndFlush(account);

    req.session.accountId = account.id;

    return { account };
  }
}
