import {
   Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany,
} from 'typeorm';
import Vendedor from './Vendedor';

@Entity({ synchronize: false })
export default class Empresa {
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

   @OneToMany(() => Vendedor, (vendedor) => vendedor.empresa)
   vendedores: Vendedor[];
}
