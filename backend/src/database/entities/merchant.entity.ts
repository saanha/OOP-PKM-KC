import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TableMerchant } from './tablemerchant.entity';
import { FoodCategory } from './foodcategory.entity';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { RSVP } from './rsvp.entity';
import { MerchantConfig } from './merchantconfig.entity';

@Entity('Merchant')
export class Merchant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id_merchant' })
    merchantId!: string;

    @Column({ length: 64 })
    name!: string;

    @Column({ length: 64 })
    address!: string;

    @Column({ length: 64, unique: true })
    merchantUrl!: string;

    @Column({ name: 'id_merchant_config', select: false, nullable: true })
    merchantConfigId!: number;

    @OneToOne(() => MerchantConfig)
    @JoinColumn({ name: 'id_merchant_config' })
    config!: MerchantConfig;

    @OneToMany(() => TableMerchant, (tableMerchant) => tableMerchant)
    table!: TableMerchant[];

    @OneToMany(() => FoodCategory, (foodCategory) => foodCategory)
    foodCategory!: FoodCategory[];

    @OneToMany(() => Transaction, (transaction) => transaction)
    transaction!: Transaction[];

    @OneToMany(() => User, (user) => user)
    officer!: User[];

    @OneToMany(() => RSVP, (rsvp) => rsvp)
    rsvp!: RSVP[];
}
