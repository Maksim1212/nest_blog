import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../user.entity';
import { serviceConfig } from '../../config';
import { TokensInterface } from '../interfaces/user.model.interface';

export default async function getJWTTokens(user: number): Promise<TokensInterface> {
    const accessToken = jwt.sign({ user }, serviceConfig.jwt.accessSecret, { expiresIn: 86400 });
    const refreshToken = jwt.sign({ user }, serviceConfig.jwt.refreshSecret, { expiresIn: '15d' });
    const userRefreshToken = { refreshToken };
    await getRepository(User).update(user, userRefreshToken);
    return {
        accessToken,
        refreshToken,
    };
}
