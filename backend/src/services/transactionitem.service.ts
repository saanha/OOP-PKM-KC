import { Service } from 'typedi';
import type { FoodDTO, FoodEditDTO, TransactionItemDTO } from '../validations/transactionitem.validation';
import { TransactionItem } from '../database/entities/transactionitem.entity';
import { Errors } from '../utils/api.util';

@Service()
export class TransactionItemService {
    async createTransactionItem(dto: TransactionItemDTO) {
        const foods: FoodDTO[] = dto.foods;

        for (let i = 0; i < foods.length; i++) {
            const transactionItem = TransactionItem.create({ ...dto.foods[i] });
            // eslint-disable-next-line no-await-in-loop
            await TransactionItem.save(transactionItem);
        }
    }

    async getTransactionItem(transactionItemId: number) {
        const transactionItem = await TransactionItem.findOne({
            where: { transactionItemId },
            relations: { food: { foodCategory: true } }
        });

        if (!transactionItem) {
            throw Errors.TRANSACTION_ITEM_NOT_FOUND;
        }

        return transactionItem;
    }

    async getAllTransactionItem(transactionId: number) {
        const transactionItems = await TransactionItem.find({
            where: { transactionId },
            relations: { food: { foodCategory: true } }
        });

        if (!transactionItems) {
            throw Errors.TRANSACTION_ITEM_NOT_FOUND;
        }

        return transactionItems;
    }

    async deleteTransactionItem(transactionItemId: number) {
        const transactionItem = await this.getTransactionItem(transactionItemId);

        await TransactionItem.remove(transactionItem);
    }

    async editTransactionItem(dto: FoodEditDTO, transactionItemId: number) {
        const transactionItem = await this.getTransactionItem(transactionItemId);

        transactionItem.isCooked = dto.isCooked;

        await transactionItem.save();
    }

    async getActiveTransactionItem(merchantId: string) {
        const transactionItems = await TransactionItem.find({
            where: { transaction: { merchant: { merchantId } }, isCooked: false },
            relations: { transaction: { tableMerchant: true }, food: { foodCategory: true } }
        });

        return transactionItems;
    }
}
