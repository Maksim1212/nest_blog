import * as jwt from 'jsonwebtoken';

import JWTCheckerInterface from 'src/interfaces/jwt.checker.interface';
import getJWTTokens from '../users/helpers/get.jwt.tokens';
import { TokensInterface } from '../users/interfaces/user.model.interface';
import { serviceConfig } from '../config';
import UserService from '../users/user.service';

export default class JWTChecker implements JWTCheckerInterface {
    constructor(private readonly userService: UserService) {}

    async isAuthJWT(userAccessToken: string): Promise<boolean> {
        let tokens: TokensInterface;
        let verify;
        try {
            const token = userAccessToken;
            verify = jwt.verify(token, serviceConfig.jwt.accessSecret);
        } catch (error) {
            if (error.message === 'jwt expired') {
                const decoded = [];
                decoded.push(...Object.values(jwt.decode(userAccessToken)));
                const userId: number = decoded[0];
                tokens = await getJWTTokens(userId);
                const user = await this.userService.findByUserId(userId);
                const { accessToken } = tokens;
                // eslint-disable-next-line no-param-reassign
                userAccessToken = accessToken;
                const token = userAccessToken;
                verify = jwt.verify(token, serviceConfig.jwt.accessSecret);
                if (!user) {
                    return false;
                }
            } else {
                return false;
            }
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (verify.exp > currentTime) {
            return true;
        }
        return true;
    }
}
