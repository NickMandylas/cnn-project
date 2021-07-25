import { Migration } from '@mikro-orm/migrations';

export class Migration20210725162249 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("id" uuid not null, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "account" add constraint "account_pkey" primary key ("id");');
  }

}
