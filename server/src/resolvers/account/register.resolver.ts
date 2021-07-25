import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { ServerContext } from "@server/contracts/interfaces/serverContext";
import { RegisterInput } from "@server/contracts/validation/account.validator";
import { Account } from "@server/entities/account.entity";
import { AccountResponse } from "@server/shared/responses/account";

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

    const hashedPassword = await argon2.hash(password);

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
