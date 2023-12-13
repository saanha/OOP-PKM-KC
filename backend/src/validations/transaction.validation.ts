import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { TransactionStatus } from '../database/entities/transaction.entity';

export class CreateTransactionDTO {
    @IsUUID()
    merchantId!: string;

    @IsUUID()
    tableMerchantId!: string;
}

export class EditTransactionDTO {
    @IsEnum(TransactionStatus)
    status!: TransactionStatus;

    @IsNumber()
    totalPrice!: number;
}
