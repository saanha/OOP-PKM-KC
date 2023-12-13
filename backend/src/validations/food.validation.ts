import { IsNumber, IsString, IsUUID } from 'class-validator';

export class FoodCategoryEditDTO {
    @IsString()
    name!: string;
}

export class FoodCategoryDTO extends FoodCategoryEditDTO {
    @IsUUID()
    merchantId!: string;
}

export class FoodDTO {
    @IsString()
    name!: string;

    @IsNumber()
    price!: number;

    @IsString()
    isSpicy!: string;

    @IsString()
    isMerchantFavorite!: string;

    @IsNumber()
    foodCategoryId!: number;

    @IsString()
    description!: string;
}
