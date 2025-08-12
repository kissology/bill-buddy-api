// migration: 1754641000002-DDLCreateAccount.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLCreateAccount1754641000002 implements MigrationInterface {
  name = 'DDLCreateAccount1754641000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "account" (
        "id" SERIAL PRIMARY KEY,
        "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "provider" varchar NOT NULL,                 -- 'google' | 'microsoft'
        "provider_user_id" varchar NOT NULL,
        "email_address" varchar NOT NULL,
        "access_token" text NOT NULL,
        "refresh_token" text,
        "token_expires_at" timestamp,
        "scope" text,
        "sync_cursor" varchar,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_account_provider_user" UNIQUE ("provider","provider_user_id"),
        CONSTRAINT "UQ_account_user_mailbox" UNIQUE ("user_id","provider","email_address")
      );
    `);
    await queryRunner.query(`CREATE INDEX "IDX_account_user" ON "account"("user_id");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_account_user";`);
    await queryRunner.query(`DROP TABLE "account";`);
  }
}
