import {
   Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne,
} from 'typeorm';
import Empresa from './Empresa';

@Entity({ synchronize: false })
export default class Vendedor {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   nome: string;

   @Column()
   picpay_token: string;

   @CreateDateColumn()
   dh_insert: Date;

   @UpdateDateColumn()
   dh_altera: Date;

   @ManyToOne(() => Empresa, (empresa) => empresa.vendedores)
   empresa: Empresa;
}
