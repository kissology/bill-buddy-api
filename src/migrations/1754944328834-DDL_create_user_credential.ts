import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLCreateUserCredential1754944328834 implements MigrationInterface {
    name = 'DDLCreateUserCredential1754944328834'

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_credential" (
        "user_id" integer PRIMARY KEY REFERENCES "user"("id") ON DELETE CASCADE,
        "password_hash" varchar NOT NULL,
        "password_algorithm" varchar NOT NULL DEFAULT 'bcrypt',
        "password_updated_at" timestamp NOT NULL DEFAULT now(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "password";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "password" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`DROP TABLE "user_credential"`);
  }
}
