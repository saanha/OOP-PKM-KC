import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { TransactionItemService } from '../../services/transactionitem.service';
import { Response } from 'express';
import { FoodEditDTO, TransactionItemDTO } from '../../validations/transactionitem.validation';
import { sendResponse } from '../../utils/api.util';

@Service()
@JsonController('/v1/transaction/transactionitem')
export class TransactionItemController {
    constructor(private readonly transactionItemService: TransactionItemService) {}

    @Post('/create')
    async createTransactionItem(@Res() res: Response, @Body() dto: TransactionItemDTO) {
        await this.transactionItemService.createTransactionItem(dto);

        return sendResponse(res, { message: 'Transaction Item created!' });
    }

    @Get('/find/:transactionItemId')
    async getTransactionItem(@Res() res: Response, @Param('transactionItemId') transactionItemId: number) {
        const transactionItem = await this.transactionItemService.getTransactionItem(transactionItemId);

        return sendResponse(res, {
            message: 'Transaction Item found!',
            data: { transactionItem }
        });
    }

    @Get('/get/active/:merchantId')
    async getActiveTransactionItem(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const transactionItem = await this.transactionItemService.getActiveTransactionItem(merchantId);

        return sendResponse(res, { message: 'success', data: { transactionItem } });
    }

    @Get('/:transactionId')
    async getAllTransactionItem(@Res() res: Response, @Param('transactionId') transactionId: number) {
        const transactionItems = await this.transactionItemService.getAllTransactionItem(transactionId);

        return sendResponse(res, {
            message: 'Showing all transaction!',
            data: { transactionItems }
        });
    }

    @Delete('/delete/:transactionItem')
    async deleteTransactionItem(@Res() res: Response, @Param('transactionItemId') transactionItemId: number) {
        await this.transactionItemService.deleteTransactionItem(transactionItemId);

        return sendResponse(res, { message: 'Transaction item successfully deleted!' });
    }

    @Put('/edit/:transactionItemId')
    async editTransactionItemId(
        @Res() res: Response,
        @Param('transactionItemId') transactionItemId: number,
        @Body() dto: FoodEditDTO
    ) {
        await this.transactionItemService.editTransactionItem(dto, transactionItemId);

        return sendResponse(res, { message: 'Transaction Item Successfully edited' });
    }
}
