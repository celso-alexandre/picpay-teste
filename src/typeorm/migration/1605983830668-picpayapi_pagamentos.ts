import { MigrationInterface, QueryRunner } from 'typeorm';

export default class picpayapiPagamentos1605983830668 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
         CREATE TABLE public.pagamentos
         (
            id bigserial NOT NULL,
            reference_id character varying(20) UNIQUE NOT NULL,
            value numeric(20,6) NOT NULL,
            qrcode text NOT NULL,
            checkout_url varchar NOT NULL,
            cancellation_id varchar,
            authorization_id varchar,
            estornado boolean DEFAULT false,
            expirado boolean DEFAULT false,
            dh_insert timestamp without time zone DEFAULT NOW(),
            dh_altera timestamp without time zone DEFAULT NOW(),
            PRIMARY KEY (id)
         )
         
         TABLESPACE pg_default;
         
         ALTER TABLE public.pagamentos
            OWNER to postgres;
      `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('public.pagamentos');
   }
}
