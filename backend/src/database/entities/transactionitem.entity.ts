import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Food } from './food.entity';

@Entity('Transaction_Item')
export class TransactionItem extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_transaction_item' })
    transactionItemId!: number;

    @Column()
    quantity!: number;

    @Column()
    price!: number;

    @Column({ name: 'id_transaction' })
    transactionId!: number;

    @Column({ name: 'id_food' })
    foodId!: number;

    @Column({ name: 'is_food_cooked', default: false })
    isCooked!: boolean;

    @Column()
    notes!: string;

    @ManyToOne(() => Transaction)
    @JoinColumn({ name: 'id_transaction' })
    transaction!: Transaction;

    @ManyToOne(() => Food)
    @JoinColumn({ name: 'id_food' })
    food!: Food;
}
