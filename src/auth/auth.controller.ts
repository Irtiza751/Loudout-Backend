import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface User {
    name: string;
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // signup/register user
    @Post('signup')
    signup(@Body() user: User) {
        return this.authService.saveUser(user);
    }

    // signin/login user
    @Post('signin')
    signin() {
        return { msg: 'You are now logedin to your account'}
    }

    // get user info
    @Get('me/:id')
    me(@Param('id') id: string) {
        return this.authService.getUserById(id);
    }
}
