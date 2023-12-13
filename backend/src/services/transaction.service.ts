import { Service } from 'typedi';
import { Transaction } from '../database/entities/transaction.entity';
import { Errors } from '../utils/api.util';
import type { CreateTransactionDTO, EditTransactionDTO } from '../validations/transaction.validation';

@Service()
export class TransactionSercice {
    async createTransaction(dto: CreateTransactionDTO) {
        const transaction = Transaction.create({
            ...dto
        });

        await Transaction.save(transaction);

        return transaction;
    }

    async getTransaction(transactionId: number) {
        const transaction = await Transaction.findOne({
            where: { transactionId },
            relations: { transactionItem: { food: { foodCategory: true } } }
        });

        if (!transaction) {
            throw Errors.TRANSACTION_NOT_FOUND;
        }

        return transaction;
    }

    async getAllTransaction(merchantId: string) {
        const transactions = await Transaction.find({
            where: { merchantId },
            relations: { transactionItem: { food: { foodCategory: true } } }
        });

        return transactions;
    }

    async deleteTransaction(transactionId: number) {
        const transaction = await this.getTransaction(transactionId);

        await Transaction.remove(transaction);
    }

    async editTransaction(dto: EditTransactionDTO, transactionId: number) {
        const transaction = await this.getTransaction(transactionId);

        transaction.status = dto.status;
        transaction.totalPrice = dto.totalPrice;

        await transaction.save();
    }
}
