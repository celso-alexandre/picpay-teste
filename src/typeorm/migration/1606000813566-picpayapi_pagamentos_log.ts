import { MigrationInterface, QueryRunner } from 'typeorm';

export default class picpayapiPagamentosLog1606000813566 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
         CREATE TABLE public.pagamentos_log
         (
            id bigserial NOT NULL,
            id_pagamento bigint,
            status_http int,
            metodo_http varchar,
            api_uri varchar,
            request jsonb,
            response jsonb,
            pagamentos_old jsonb,
            pagamentos_new jsonb,
            dh_insert timestamp without time zone DEFAULT NOW(),
            dh_altera timestamp without time zone DEFAULT NOW()
         )
         
         TABLESPACE pg_default;
         
         ALTER TABLE public.pagamentos
            OWNER to postgres;
      `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP DATABASE pagamentos_log;');
   }
}
