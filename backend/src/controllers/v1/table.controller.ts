import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { TableService } from '../../services/table.service';
import { EditTableDto, CreateTableDto } from '../../validations/table.validation';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';

@Service()
@JsonController('/v1/merchant/table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post('/create')
    async create(@Res() res: Response, @Body() dto: CreateTableDto) {
        await this.tableService.create(dto);

        return sendResponse(res, { message: 'table successfully added!' });
    }

    @Get('/:merchantId')
    async getAll(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const tables = await this.tableService.getAll(merchantId);

        return sendResponse(res, {
            message: 'successfully found all tables',
            data: { tables }
        });
    }

    @Get('/find/:tableId')
    async findTable(@Res() res: Response, @Param('tableId') tableId: string) {
        const table = await this.tableService.get(tableId);

        return sendResponse(res, {
            message: 'table found!',
            data: { table }
        });
    }

    @Delete('/delete/:tableId')
    async deleteTables(@Res() res: Response, @Param('tableId') tableId: string) {
        await this.tableService.delete(tableId);

        return sendResponse(res, { message: 'Table successfully deleted!' });
    }

    @Put('/edit/:tableId')
    async editTable(@Res() res: Response, @Param('tableId') tableId: string, @Body() dto: EditTableDto) {
        await this.tableService.edit(tableId, dto);

        return sendResponse(res, { message: 'Table successfully edited!' });
    }
}
