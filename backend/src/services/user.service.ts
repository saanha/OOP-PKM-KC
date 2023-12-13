import { Service } from 'typedi';
import { User, UserRole } from '../database/entities/user.entity';
import { Errors, ResponseError } from '../utils/api.util';
import { AuthService } from './auth.service';
import type { RegisterOfficerDTO } from '../validations/user.validation';
import { StatusCodes } from 'http-status-codes';

@Service()
export class UserService {
    constructor(private readonly authService: AuthService) {}

    async getProfile(userId: number): Promise<User | null> {
        const user = User.findOne({
            where: { userId },
            select: { password: false },
            relations: { merchant: true }
        });

        if (!user) {
            throw Errors.USER_NOT_FOUND;
        }

        return user;
    }

    async createOfficer(body: RegisterOfficerDTO) {
        const foundUser = await User.findOneBy({ email: body.email });

        if (foundUser) {
            throw new ResponseError('This email is already registered', StatusCodes.CONFLICT);
        }

        const user = User.create({
            role: UserRole.OFFICER,
            merchantId: body.merchantId,
            email: body.email,
            name: body.name,
            password: body.password
        });

        user.password = await this.authService.hashPassword(user.password);
        await User.save(user);
    }

    async setMerchant(userId: number, merchantId: string) {
        const user = await User.findOneBy({ userId });

        if (user === null) {
            throw new ResponseError('User not found!', StatusCodes.NOT_FOUND);
        }

        user.merchantId = merchantId;

        await user.save();
    }

    async getOfficer(merchantId: string) {
        if (merchantId.length !== 36) {
            throw Errors.UUID_NOT_VALID;
        }

        const officer = await User.find({ where: { merchantId, role: 1 } });

        return officer;
    }
}
