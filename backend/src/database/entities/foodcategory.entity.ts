import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Merchant } from './merchant.entity';
import { Food } from './food.entity';

@Entity('Food_Category')
export class FoodCategory extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_food_category' })
    foodCategoryId!: number;

    @Column({ length: 64 })
    name!: string;

    @Column({ name: 'id_merchant' })
    merchantId!: string;

    @Column({ name: 'is_hidden', default: false })
    isHidden!: boolean;

    @ManyToOne(() => Merchant)
    @JoinColumn({ name: 'id_merchant' })
    merchant!: Merchant;

    @OneToMany(() => Food, (food) => food.foodCategory)
    food!: Food[];
}
