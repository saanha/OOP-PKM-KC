import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { TransactionItem } from './transactionitem.entity';
import { TableMerchant } from './tablemerchant.entity';

export enum TransactionStatus {
    Not_Paid,
    Paid,
    Cancelled
}

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_transaction' })
    transactionId!: number;

    @CreateDateColumn({ name: 'date' })
    createdAt!: Date;

    @Column({ name: 'total_price', nullable: true })
    totalPrice!: number;

    @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.Not_Paid })
    status!: TransactionStatus;

    @Column({ name: 'id_merchant', select: false })
    merchantId!: string;

    @Column('uuid', { name: 'id_table_merchant' })
    tableMerchantId!: string;

    @ManyToOne(() => TableMerchant)
    @JoinColumn({ name: 'id_table_merchant' })
    tableMerchant!: TableMerchant;

    @ManyToOne(() => Merchant, (merchant) => merchant)
    @JoinColumn({ name: 'id_merchant' })
    merchant!: Merchant;

    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.transaction)
    transactionItem!: TransactionItem[];
}
