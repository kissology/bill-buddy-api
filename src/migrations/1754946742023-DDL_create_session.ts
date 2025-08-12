// migration: 1754641000003-DDLCreateSession.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLCreateSession1754641000003 implements MigrationInterface {
  name = 'DDLCreateSession1754641000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryRunner.query(`
      CREATE TABLE "session" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "refresh_token_hash" varchar NOT NULL UNIQUE,
        "user_agent" varchar,
        "ip_address" inet,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "expires_at" timestamp NOT NULL,
        "revoked_at" timestamp
      );
    `);
    await queryRunner.query(`CREATE INDEX "IDX_session_user" ON "session"("user_id");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_session_user";`);
    await queryRunner.query(`DROP TABLE "session";`);
  }
}
