import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Post, Put, Query, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DeepPartial } from 'typeorm';

import UserService from './user.service';
import { getUserMainFields } from './user.entity';
import { PasswordInterface, UpdateDataInterface } from './interfaces/user.model.interface';
import CreateUserDto from './dto/create.user.dto';
import LoginUserDto from './dto/login.user.dto';
import UpdateUserDto from './dto/update.user.dto';
import LogoutUserDto from './dto/logout.user.dto';
import getJWTTokens from './helpers/get.jwt.tokens';

const saltRounds = 10;
const userNotFound = 'This Email not found';
const wrongPassword = 'Wrong Password';

@Controller('/v1/auth')
export default class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/create')
    private async createUser(@Body() newUser: DeepPartial<CreateUserDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new CreateUserDto(newUser));
        // eslint-disable-next-line no-param-reassign
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        const results = await this.userService.createUser(newUser);
        return res.status(200).json(results);
    }

    @Post('/login')
    private async loginUser(@Body() loginUser: DeepPartial<LoginUserDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new LoginUserDto(loginUser));
        const user = await this.userService.findByEmail(loginUser.email);
        if (!user) {
            return res.status(401).json({
                message: userNotFound,
            });
        }

        const reqPassword = loginUser.password;
        const userPassword = user.password;
        const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);

        if (!passwordsMatch) {
            return res.status(401).json({
                message: wrongPassword,
            });
        }

        const token = await getJWTTokens(user.id);
        const { accessToken } = token;
        let data = {};
        data = {
            ...getUserMainFields(user),
            accessToken,
        };
        return res.status(200).json({
            data,
        });
    }

    @Put('/update')
    private async updateUserPass(
        @Body() updatedUser: DeepPartial<UpdateUserDto>,
        @Res() res: Response,
    ): Promise<Response> {
        await validateOrReject(new UpdateUserDto(updatedUser));
        const updatingUser = await this.userService.findByEmail(updatedUser.email);

        if (!updatingUser) {
            return res.status(401).json({ message: 'wrong Email' });
        }

        const reqPassword = updatedUser.password;
        const userPassword = updatingUser.password;
        const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);

        if (!passwordsMatch) {
            return res.status(401).json({ message: wrongPassword });
        }

        const newPassword: PasswordInterface = {
            password: await bcrypt.hash(updatedUser.newPassword, saltRounds),
        };

        await this.userService.updateUser(updatingUser.id, newPassword);
        return res.status(200).json({ message: 'your password has been successfully updated' });
    }

    @Get('/user/:id')
    private async getUserFromID(@Query('id') id: number, @Res() res: Response): Promise<Response> {
        const user = await this.userService.findByUserId(id);
        const { name } = user;
        return res.status(200).json({ name });
    }

    @Post('/logout')
    private async logout(@Body() logoutUser: DeepPartial<LogoutUserDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new LogoutUserDto(logoutUser));
        const userData: UpdateDataInterface = { refreshToken: 'null' };
        const userId = logoutUser.user_id;
        await this.userService.updateUser(userId, userData);
        return res.status(200).json({ message: 'you have successfully logged out' });
    }
}
