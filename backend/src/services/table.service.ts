import { Service } from 'typedi';
import type { CreateTableDto, EditTableDto } from '../validations/table.validation';
import { TableMerchant } from '../database/entities/tablemerchant.entity';
import { Errors } from '../utils/api.util';

@Service()
export class TableService {
    async create({ name, size, merchantId }: CreateTableDto) {
        const table = TableMerchant.create({ name, size, merchantId });
        await TableMerchant.save(table);
    }

    async getAll(merchantId: string) {
        if (merchantId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const tables = await TableMerchant.find({
            where: { merchantId },
            relations: { transaction: { transactionItem: { food: { foodCategory: true } } } },
            order: { name: 'ASC' }
        });

        return tables;
    }

    async get(tableId: string) {
        if (tableId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const table = await TableMerchant.findOne({
            where: { tableId },
            relations: { transaction: { transactionItem: { food: { foodCategory: true } } } },
            order: { name: 'ASC' }
        });

        if (!table) {
            throw Errors.TABLE_NOT_FOUND;
        }

        return table;
    }

    async delete(tableId: string) {
        if (tableId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const table = await this.get(tableId);

        await TableMerchant.remove(table);
    }

    async edit(tableId: string, { name, size }: EditTableDto) {
        if (tableId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const table = await this.get(tableId);

        table.name = name;
        table.size = size;

        return table.save();
    }
}
