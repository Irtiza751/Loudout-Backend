import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUpUser(@Body() userData: Prisma.UserCreateInput) {
        return this.userService.signup(userData);
    }
}
