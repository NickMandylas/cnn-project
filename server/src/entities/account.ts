import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Account {
  @PrimaryKey({ type: "uuid" })
  accountId: string = v4();

  @Property({ type: "text" })
  firstName: string;

  @Property({ type: "text" })
  lastName: string;

  @Property({ type: "text" })
  email: string;

  @Property({ type: "text" })
  password: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
