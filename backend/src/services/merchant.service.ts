/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi';
import { Merchant } from '../database/entities/merchant.entity';
import { Errors } from '../utils/api.util';
import type { MerchantConfigDTO, MerchantDTO, MerchantEditDTO } from '../validations/merchant.validation';
import { UserService } from './user.service';
import { MerchantConfigService } from './config.service';
import { MerchantConfig } from '../database/entities/merchantconfig.entity';

@Service()
export class MerchantService {
    constructor(private readonly userService: UserService, private readonly configService: MerchantConfigService) {}

    async create({ name, address, userId }: MerchantDTO) {
        const merchantUrl = name.split(' ').join('-').toLowerCase();
        const isMerchantUrlTaken = await Merchant.findOne({ where: { merchantUrl } });

        if (isMerchantUrlTaken) {
            throw Errors.MERCHANTURL_TAKEN;
        }

        const merchantConfigId = await this.configService.create();
        const merchant = Merchant.create({ name, address, merchantUrl, merchantConfigId });

        await Merchant.save(merchant);
        await this.userService.setMerchant(userId, merchant.merchantId);

        const user = await this.userService.getProfile(userId);
        return user;
    }

    async getById(merchantId: string) {
        const merchant = await Merchant.findOne({ where: { merchantId }, relations: { config: true } });

        if (!merchant) {
            throw Errors.MERCHANT_NOT_FOUND;
        }

        return merchant;
    }

    async getByUrl(merchantUrl: string) {
        const merchant = await Merchant.findOne({ where: { merchantUrl }, relations: { config: true } });

        if (!merchant) {
            throw Errors.MERCHANT_NOT_FOUND;
        }

        return merchant;
    }

    async delete(merchantId: string) {
        const merchant = await this.getById(merchantId);

        await Merchant.remove(merchant);
    }

    async edit(merchantId: string, { merchantUrl, name, address }: MerchantEditDTO) {
        const merchant = await this.getById(merchantId);
        const isMerchantUrlTaken = await Merchant.findOneBy({ merchantUrl });

        if (isMerchantUrlTaken) {
            throw Errors.MERCHANTURL_TAKEN;
        }

        merchant.name = name;
        merchant.address = address;
        merchant.merchantUrl = merchantUrl;

        await merchant.save();
    }

    async getAll() {
        const merchant = await Merchant.find();

        return merchant;
    }

    async editMerchantConfig(dto: MerchantConfigDTO, fileLogo: any, fileHome: any, fileAbout: any, merchantId: string) {
        const merchantConfigId = (await this.getById(merchantId)).merchantConfigId;
        const merchantConfig = await MerchantConfig.findOne({ where: { merchantConfigId } });

        if (merchantConfig === null) {
            throw Errors.MERCHANT_NOT_FOUND;
        }

        merchantConfig.primaryColor = dto.primaryColor;
        merchantConfig.secondaryColor = dto.secondaryColor;
        merchantConfig.thirdColor = dto.thirdColor;
        merchantConfig.aboutDescription = dto.aboutDescription;

        if (fileLogo) {
            merchantConfig.logoPhotoPath =
                fileLogo.originalname === null || fileLogo.originalname === undefined
                    ? merchantConfig.logoPhotoPath
                    : fileLogo.originalname;
        }

        if (fileHome) {
            merchantConfig.homePhotoPath =
                fileHome.originalname === null || fileHome.originalname === undefined
                    ? merchantConfig.homePhotoPath
                    : fileHome.originalname;
        }

        if (fileAbout) {
            merchantConfig.aboutPhotoPath =
                fileAbout.originalname === null || fileAbout.originalname === undefined
                    ? merchantConfig.aboutPhotoPath
                    : fileAbout.originalname;
        }
        await merchantConfig.save();
    }
}
