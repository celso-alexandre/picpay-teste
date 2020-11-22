import {
   Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export default class PagamentosLog {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   id_pagamento: number;

   @Column()
   status_http: number;

   @Column()
   metodo_http: string;

   @Column()
   api_uri: string;

   @Column()
   request: string;

   @Column()
   response: string;

   @Column()
   pagamentos_old: string;

   @Column()
   pagamentos_new: string;

   @CreateDateColumn()
   dh_insert: Date;

   @UpdateDateColumn()
   dh_altera: Date;
}
