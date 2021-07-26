import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class Patient {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => String)
  @Property({ type: "text" })
  firstName: string;

  @Field(() => String)
  @Property({ type: "text" })
  lastName: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email: string;

  @Property({ type: "text" })
  dateOfBirth: string;

  @Property({ type: "text" })
  sex: string;

  @Property({ type: "text" })
  notes: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
