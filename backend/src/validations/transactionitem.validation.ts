import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class TransactionItemDTO {
    @IsArray()
    foods!: FoodDTO[];
}

export class FoodDTO {
    @IsNumber()
    quantity!: number;

    @IsNumber()
    price!: number;

    @IsNumber()
    transactionId!: number;

    @IsNumber()
    foodId!: number;

    @IsString()
    notes!: string;
}

export class FoodEditDTO {
    @IsBoolean()
    isCooked!: boolean;
}
