import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { TransactionSercice } from '../../services/transaction.service';
import { CreateTransactionDTO } from '../../validations/transaction.validation';
import { Response } from 'express';
import { sendResponse } from '../../utils/api.util';

@Service()
@JsonController('/v1/transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionSercice) {}

    @Post('/create')
    async create(@Res() res: Response, @Body() dto: CreateTransactionDTO) {
        const transaction = await this.transactionService.createTransaction(dto);

        return sendResponse(res, { data: { transaction }, message: 'successfully created transaction!' });
    }

    @Get('/get/:transactionId')
    async findTransaction(@Res() res: Response, @Param('transactionId') transactionId: number) {
        const transaction = await this.transactionService.getTransaction(transactionId);

        return sendResponse(res, {
            message: 'Transaction found!',
            data: { transaction }
        });
    }

    @Get('/:merchantId')
    async getAllTransaction(@Res() res: Response, @Param('merchantId') merchantiD: string) {
        const transactions = await this.transactionService.getAllTransaction(merchantiD);

        return sendResponse(res, {
            message: 'successfully found all transactions',
            data: { transactions }
        });
    }

    @Delete('/delete/:transactionId')
    async deleteTransaction(@Res() res: Response, @Param('transactionId') transactionId: number) {
        await this.transactionService.deleteTransaction(transactionId);

        return sendResponse(res, { message: 'Transaction successfully deleted!' });
    }

    @Put('/edit/:transactionId')
    async editTransaction(
        @Res() res: Response,
        @Param('transactionId') transactionId: number,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        @Body() dto: any
    ) {
        await this.transactionService.editTransaction(dto, transactionId);

        if (dto.status === 1) {
            return sendResponse(res, { message: 'Transaction status successfully changed to paid!' });
        } else if (dto.status === 2) {
            return sendResponse(res, { message: 'Transaction status successfullt changed to cancelled' });
        }
    }
}
