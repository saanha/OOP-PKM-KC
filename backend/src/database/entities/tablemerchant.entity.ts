import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Merchant } from './merchant.entity';
import { Transaction } from './transaction.entity';

@Entity('Table_Merchant')
export class TableMerchant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_table_merchant' })
    tableId!: string;

    @Column({ length: 64 })
    name!: string;

    @Column()
    size!: number;

    @Column({ name: 'id_merchant', select: false })
    merchantId!: string;

    @ManyToOne(() => Merchant)
    @JoinColumn({ name: 'id_merchant' })
    merchant!: Merchant;

    @OneToMany(() => Transaction, (transaction) => transaction.tableMerchant)
    transaction!: Transaction[];
}
