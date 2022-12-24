import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface User {
    name: string;
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // signup/register user
    @Post('signup')
    async signup(@Body() user: User) {
        try {
            return await this.authService.saveUser(user);
        } catch (error) {
            if (error.meta.target[0]) {
                throw new HttpException('Email already exist', HttpStatus.CONFLICT);
            }
        }
    }

    // signin/login user
    @Post('signin')
    async signin(@Body() user: User) {
        try {
            const userData = await this.authService.signinUser(user);
            return userData;
        } catch (error) {
            throw new HttpException('No user found with this email.', HttpStatus.NOT_FOUND);
        }
    }

    // user profile info
    @Get('me')
    userProfile(@Req() req: any) {
        const email = req.headers.user;
        return this.authService.getUserById(email);
    }
}
