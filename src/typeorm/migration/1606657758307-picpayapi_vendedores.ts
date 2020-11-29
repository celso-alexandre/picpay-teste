import { MigrationInterface, QueryRunner } from 'typeorm';

export default class picpayapiVendedores1606657758307 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
         CREATE TABLE public.vendedores
         (
            id serial NOT NULL,
            id_empresa integer NOT NULL,          
            nome varchar,
            picpay_token varchar UNIQUE NOT NULL,
            dh_insert timestamp without time zone DEFAULT NOW(),
            dh_altera timestamp without time zone DEFAULT NOW(),
            PRIMARY KEY (id),
            FOREIGN KEY (id_empresa)
               REFERENCES public.empresas (id)
               ON UPDATE CASCADE
               ON DELETE SET NULL
         )
         
         TABLESPACE pg_default;
         
         ALTER TABLE public.vendedores
            OWNER to postgres;
      `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('public.vendedores');
   }
}
