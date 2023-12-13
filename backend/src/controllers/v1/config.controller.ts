import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/v1/merchant/config')
export class MerchantConfigController {}
