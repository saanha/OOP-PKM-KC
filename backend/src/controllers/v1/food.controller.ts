/* eslint-disable @typescript-eslint/no-explicit-any */

import { Body, Get, JsonController, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { FoodService } from '../../services/food.service';
import { FoodCategoryDTO, FoodCategoryEditDTO } from '../../validations/food.validation';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import multer from 'multer';
import uploader from '../../utils/uploader.util';

@Service()
@JsonController('/v1/food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}

    @Post('/')
    @UseBefore(multer({ dest: '../../images', storage: uploader }).fields([{ maxCount: 1, name: 'foodImage' }]))
    async createFood(@Res() res: Response, @Req() req: any, @Body() dto: any) {
        const fileOne = req?.files?.foodImage ? req.files.foodImage[0] : null;
        await this.foodService.createFood(dto, fileOne);

        return sendResponse(res, { message: 'Success' });
    }

    @Get('/get/:merchantId')
    async getAllFood(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const food = await this.foodService.getAllFood(merchantId);

        return sendResponse(res, { data: { food }, message: 'Success' });
    }

    @Get('/getbyId/:foodId')
    async getById(@Res() res: Response, @Param('foodId') foodId: number) {
        const food = await this.foodService.getById(foodId);

        return sendResponse(res, { data: { food }, message: 'Success' });
    }

    @Put('/edit/:foodId')
    @UseBefore(multer({ dest: '../../images', storage: uploader }).fields([{ maxCount: 1, name: 'foodImage' }]))
    async editFood(@Res() res: Response, @Param('foodId') foodId: number, @Body() dto: any) {
        await this.foodService.editFood(foodId, dto);

        return sendResponse(res, { message: 'Food edited!' });
    }

    @Put('/sethidden/:foodId')
    async setFoodHidden(@Res() res: Response, @Param('foodId') foodId: number) {
        await this.foodService.setFoodHidden(foodId);

        return sendResponse(res, { message: 'Food Category is hidden!' });
    }

    @Post('/category')
    async createCategory(@Res() res: Response, @Body() dto: FoodCategoryDTO) {
        await this.foodService.createCategory(dto);

        return sendResponse(res, { message: 'Food Category created!' });
    }

    @Get('/category/merchant/:merchantId')
    async getAllCategory(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const foodCategory = await this.foodService.getAllCategory(merchantId);

        return sendResponse(res, { data: { foodCategory }, message: 'Success' });
    }

    @Get('/category/:foodCategoryId')
    async getCategory(@Res() res: Response, @Param('foodCategoryId') foodCategoryId: number) {
        const foodCategory = await this.foodService.getCategory(foodCategoryId);

        return sendResponse(res, { data: { foodCategory }, message: 'Success' });
    }

    @Put('/category/sethidden/:foodCategoryId')
    async setHidden(@Res() res: Response, @Param('foodCategoryId') foodCategoryId: number) {
        await this.foodService.setCategoryHidden(foodCategoryId);

        return sendResponse(res, { message: 'Food Category is hidden!' });
    }

    @Put('/category/:foodCategoryId')
    async editCategory(
        @Res() res: Response,
        @Param('foodCategoryId') foodCategoryId: number,
        @Body() dto: FoodCategoryEditDTO
    ) {
        await this.foodService.editCategory(foodCategoryId, dto);

        return sendResponse(res, { message: 'Success' });
    }
}
