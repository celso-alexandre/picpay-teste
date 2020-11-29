import { MigrationInterface, QueryRunner } from 'typeorm';

export default class picpayapiEmpresas1606657727005 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
         CREATE TABLE public.empresas
         (
            id serial NOT NULL,         
            nome varchar,
            picpay_token varchar UNIQUE NOT NULL,
            dh_insert timestamp without time zone DEFAULT NOW(),
            dh_altera timestamp without time zone DEFAULT NOW(),
            PRIMARY KEY (id)
         )
         
         TABLESPACE pg_default;
         
         ALTER TABLE public.empresas
            OWNER to postgres;
      `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('public.empresas');
   }
}
