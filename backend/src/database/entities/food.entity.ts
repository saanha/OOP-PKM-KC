import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FoodCategory } from './foodcategory.entity';
import { TransactionItem } from './transactionitem.entity';

@Entity('Food')
export class Food extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_food' })
    foodId!: number;

    @Column({ length: 64 })
    name!: string;

    @Column({ length: 128, nullable: true })
    description!: string;

    @Column()
    price!: number;

    @Column({ name: 'is_spicy' })
    isSpicy!: boolean;

    @Column({ name: 'is_merchant_favorite' })
    isMerchantFavorite!: boolean;

    @Column({ name: 'is_hidden', default: false })
    isHidden!: boolean;

    @Column({ name: 'food_photo_path' })
    foodPhotoPath!: string;

    @Column({ name: 'id_food_category' })
    foodCategoryId!: number;

    @ManyToOne(() => FoodCategory)
    @JoinColumn({ name: 'id_food_category' })
    foodCategory!: FoodCategory;

    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.food)
    transactionitem!: TransactionItem[];
}
