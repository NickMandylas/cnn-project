import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { Historical } from "./historical.entity";

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

  @Field(() => String)
  @Property({ type: "date" })
  dateOfBirth: Date;

  @Field(() => String)
  @Property({ type: "text" })
  sex: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  notes: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();

  @Field(() => [Historical])
  @OneToMany(() => Historical, (historical) => historical.patient)
  historicals = new Collection<Historical>(this);
}
