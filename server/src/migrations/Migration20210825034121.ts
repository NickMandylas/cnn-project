import { Migration } from '@mikro-orm/migrations';

export class Migration20210825034121 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "patient" ("id" uuid not null, "first_name" text not null, "last_name" text not null, "email" text not null, "date_of_birth" timestamptz(0) not null, "sex" text not null, "notes" text null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "patient" add constraint "patient_pkey" primary key ("id");');
    this.addSql('alter table "patient" add constraint "patient_email_unique" unique ("email");');

    this.addSql('create table "historical" ("id" uuid not null, "localisation" text not null, "variant" text not null, "scan_date" timestamptz(0) not null, "scan" text not null, "patient_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "historical" add constraint "historical_pkey" primary key ("id");');

    this.addSql('create table "check" ("id" uuid not null, "localisation" text not null, "variant" text not null, "confidence" text not null, "scan_date" timestamptz(0) not null, "scan" text not null, "patient_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "check" add constraint "check_pkey" primary key ("id");');

    this.addSql('create table "account" ("id" uuid not null, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "account" add constraint "account_pkey" primary key ("id");');
    this.addSql('alter table "account" add constraint "account_email_unique" unique ("email");');

    this.addSql('alter table "historical" add constraint "historical_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');

    this.addSql('alter table "check" add constraint "check_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade;');
  }

}
