/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi';
import type { FoodCategoryDTO, FoodCategoryEditDTO, FoodDTO } from '../validations/food.validation';
import { FoodCategory } from '../database/entities/foodcategory.entity';
import { MerchantService } from './merchant.service';
import { Errors } from '../utils/api.util';
import { Food } from '../database/entities/food.entity';

@Service()
export class FoodService {
    constructor(private readonly merchantService: MerchantService) {}

    async createFood(dto: FoodDTO, file: any) {
        const isSpicy = dto.isSpicy === 'true';
        const isMerchantFavorite = dto.isMerchantFavorite === 'true';
        const food = Food.create({ ...dto, foodPhotoPath: file.originalname, isSpicy, isMerchantFavorite });

        await Food.save(food);
    }

    async getAllFood(merchantId: string) {
        if (merchantId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const merchant = await this.merchantService.getById(merchantId);

        if (!merchant) {
            throw Errors.MERCHANT_NOT_FOUND;
        }

        const food = await Food.find({
            where: { foodCategory: { merchantId, isHidden: false }, isHidden: false },
            relations: { foodCategory: true }
        });

        return food;
    }

    async getById(foodId: number) {
        const food = await Food.findOne({
            where: { foodId, isHidden: false, foodCategory: { isHidden: false } },
            relations: { foodCategory: true }
        });

        if (!food) {
            throw Errors.FOOD_CATEGORY_NOT_FOUND;
        }

        return food;
    }

    async editFood(foodId: number, dto: FoodDTO) {
        const food = await this.getById(foodId);
        const isSpicy = dto.isSpicy === 'true';
        const isMerchantFavorite = dto.isMerchantFavorite === 'true';

        food.name = dto.name;
        food.price = dto.price;
        food.isSpicy = isSpicy;
        food.description = dto.description;
        food.isMerchantFavorite = isMerchantFavorite;
        food.foodCategoryId = dto.foodCategoryId;

        await food.save();
    }

    async setFoodHidden(foodId: number) {
        const food = await Food.findOne({ where: { foodId } });

        if (!food) {
            throw Errors.FOOD_CATEGORY_NOT_FOUND;
        }

        food!.isHidden = true;

        await food!.save();
    }

    async createCategory(dto: FoodCategoryDTO) {
        const merchant = await this.merchantService.getById(dto.merchantId);

        if (!merchant) {
            throw Errors.USER_NOT_FOUND;
        }

        const foodCategory = FoodCategory.create({ ...dto });

        await FoodCategory.save(foodCategory);
    }

    async getCategory(foodCategoryId: number) {
        const foodCategory = await FoodCategory.findOne({
            where: { foodCategoryId, isHidden: false },
            relations: { food: true }
        });

        if (!foodCategory) {
            throw Errors.FOOD_CATEGORY_NOT_FOUND;
        }

        return foodCategory;
    }

    async getAllCategory(merchantId: string) {
        if (merchantId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const merchant = await this.merchantService.getById(merchantId);

        if (!merchant) {
            throw Errors.MERCHANT_NOT_FOUND;
        }

        const foodCategory = await FoodCategory.find({
            where: { merchantId, isHidden: false },
            relations: { food: true }
        });

        return foodCategory;
    }

    async setCategoryHidden(foodCategoryId: number) {
        const foodCategory = await FoodCategory.findOne({ where: { foodCategoryId } });

        if (!foodCategory) {
            throw Errors.FOOD_CATEGORY_NOT_FOUND;
        }

        foodCategory!.isHidden = true;

        await foodCategory!.save();
    }

    async editCategory(foodCategoryId: number, dto: FoodCategoryEditDTO) {
        const foodCategory = await this.getCategory(foodCategoryId);

        foodCategory.name = dto.name;

        await foodCategory.save();
    }
}
