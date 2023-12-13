import { Service } from 'typedi';
import { MerchantConfig } from '../database/entities/merchantconfig.entity';

@Service()
export class MerchantConfigService {
    async create() {
        const merchantConfig = MerchantConfig.create();

        await MerchantConfig.save(merchantConfig);

        return merchantConfig.merchantConfigId;
    }
}
