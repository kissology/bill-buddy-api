import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLCreateBillTable1754639482909 implements MigrationInterface {
  name = 'DDLCreateBillTable1754639482909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "bill" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "vendor" character varying NOT NULL,
        "amount_due" numeric(10,2) NOT NULL,
        "due_date" TIMESTAMP NOT NULL,
        "email_subject" character varying NOT NULL,
        "email_snippet" text NOT NULL,
        "email_id" character varying NOT NULL,
        "payment_url" character varying,
        "is_paid" boolean NOT NULL DEFAULT false,
        "is_delinquent" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_bill_email_id" UNIQUE ("email_id"),
        CONSTRAINT "PK_bill_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "bill"
      ADD CONSTRAINT "FK_bill_user"
      FOREIGN KEY ("user_id") REFERENCES "user"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_bill_user"`);
    await queryRunner.query(`DROP TABLE "bill"`);
  }
}
