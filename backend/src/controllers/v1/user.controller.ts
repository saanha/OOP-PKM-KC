import { StatusCodes } from 'http-status-codes';
import { UserService } from './../../services/user.service';
import { Body, CurrentUser, Get, JsonController, Param, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { UserPayload } from '../../typings/auth';
import { RegisterOfficerDTO } from '../../validations/user.validation';

@Service()
@JsonController('/v1/users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('/profile')
    async getProfile(@Res() res: Response, @CurrentUser({ required: true }) user: UserPayload) {
        const { userId } = user;
        const profile = await this.service.getProfile(userId);
        return sendResponse(res, {
            message: 'Success getting user profile',
            data: { profile }
        });
    }

    @Post('/officer')
    async createOfficer(@Res() res: Response, @Body() dto: RegisterOfficerDTO) {
        await this.service.createOfficer(dto);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully registered new officer'
        });
    }

    @Get('/officer/:merchantId')
    async getOfficer(@Res() res: Response, @Param('merchantId') merchantId: string) {
        const officer = await this.service.getOfficer(merchantId);

        return sendResponse(res, { data: { officer }, message: 'Success!' });
    }
}
