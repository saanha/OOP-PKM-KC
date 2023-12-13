/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { JsonController, Body, Res, Delete, Post, Get, Put, Param, UseBefore, Req } from 'routing-controllers';
import { MerchantDTO, MerchantEditDTO } from '../../validations/merchant.validation';
import { MerchantService } from '../../services/merchant.service';
import multer from 'multer';
import uploader from '../../utils/uploader.util';

@Service()
@JsonController('/v1/merchant')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) {}

    @Post('/create')
    async create(@Res() res: Response, @Body() dto: MerchantDTO) {
        const user = await this.merchantService.create(dto);

        return sendResponse(res, { data: { user }, message: 'Merchant successfully added!' });
    }

    @Delete('/delete/:merchantId')
    async deleteMerchant(@Res() res: Response, @Param('merchantId') merchantId: string) {
        await this.merchantService.delete(merchantId);

        return sendResponse(res, { message: 'Merchant successfully deleted!' });
    }

    @Get('/get/:merchantId')
    async getMerchant(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const merchant = await this.merchantService.getById(merchantId);

        return sendResponse(res, {
            message: 'Merchant found!',
            data: { merchant }
        });
    }

    @Get('/get/url/:merchantUrl')
    async getMerchantByUrl(@Res() res: Response, @Param('merchantUrl') merchantUrl: string) {
        const merchant = await this.merchantService.getByUrl(merchantUrl);

        return sendResponse(res, {
            message: 'Merchant found!',
            data: { merchant }
        });
    }

    @Get('/')
    async getAllMerchant(@Res() res: Response) {
        const merchants = await this.merchantService.getAll();

        return sendResponse(res, {
            message: 'successfully found all merchant',
            data: { merchants }
        });
    }

    @Put('/edit/:merchantId')
    async editMerchant(@Res() res: Response, @Param('merchantId') merchantId: string, @Body() dto: MerchantEditDTO) {
        await this.merchantService.edit(merchantId, dto);

        return sendResponse(res, { message: 'Merchant successfully edited!' });
    }

    @Post('/config/:merchantId')
    @UseBefore(
        multer({ dest: '../../images', storage: uploader }).fields([
            { maxCount: 1, name: 'logoImage' },
            { maxCount: 1, name: 'homeImage' },
            { maxCount: 1, name: 'aboutImage' }
        ])
    )
    async editMerchantConfig(
        @Res() res: Response,
        @Param('merchantId') merchantId: string,
        @Body() dto: any,
        @Req() req: any
    ) {
        const fileLogo = req?.files?.logoImage ? req.files.logoImage[0] : null;
        const fileHome = req?.files?.homeImage ? req.files.homeImage[0] : null;
        const fileAbout = req?.files?.aboutImage ? req.files.aboutImage[0] : null;

        await this.merchantService.editMerchantConfig(dto, fileLogo, fileHome, fileAbout, merchantId);
        return sendResponse(res, { message: 'Merchant Config successfully edited!' });
    }
}
