import {
   Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export default class Pagamentos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reference_id: string;

    @Column()
    value: number;

    @Column()
    qrcode: string;

    @Column()
    checkout_url: string;

    @Column()
    cancellation_id: string;

    @Column()
    authorization_id: string;

    @Column()
    expirado: boolean;

    @Column()
    estornado: boolean;

    @CreateDateColumn()
    dh_insert: Date;

    @UpdateDateColumn()
    dh_altera: Date;
}
