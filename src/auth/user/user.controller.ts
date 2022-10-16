import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAllUsers() {
        return this.userService.getAllUser();
    }

    @Post('signup')
    async signUpUser(@Body() userData: Prisma.UserCreateInput) {
        return this.userService.signup(userData);
    }

    @Get('me/:id')
    async myProfile(@Param('id') id: number) {
        const user = this.userService.me(+id);
        if(user) {
            return user;
        } else {
            return {msg: 'User doest not exist'};
        }
    }
}
