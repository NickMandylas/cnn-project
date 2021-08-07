import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { Patient } from "./patient.entity";

@ObjectType()
@Entity()
export class Historical {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => String)
  @Property({ type: "text" })
  localisation: string;

  @Field(() => String)
  @Property({ type: "text" })
  variant: string;

  @Field(() => String)
  @Property({ type: "date" })
  scanDate: Date;

  @Field(() => String)
  @Property({ type: "text" })
  scan: string;

  @ManyToOne({ entity: () => Patient })
  patient: Patient;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
