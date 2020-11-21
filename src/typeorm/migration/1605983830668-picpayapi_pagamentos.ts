import { MigrationInterface, QueryRunner } from 'typeorm';

export default class picpayapiPagamentos1605983830668 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
         CREATE TABLE public.pagamentos
         (
            id bigserial NOT NULL,
            reference_id character varying(20) UNIQUE NOT NULL,
            value numeric(20,6) NOT NULL,
            cancelado boolean DEFAULT false,
            pago boolean DEFAULT false,
            estornado boolean DEFAULT false,
            dh_insert timestamp without time zone DEFAULT NOW(),
            dh_altera timestamp without time zone DEFAULT NOW(),
            CONSTRAINT PK_pagamentos PRIMARY KEY (reference_id)
         )
         
         TABLESPACE pg_default;
         
         ALTER TABLE public.pagamentos
            OWNER to postgres;
      `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE public.pagamentos;');
   }
}
