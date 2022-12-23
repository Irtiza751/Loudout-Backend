import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface User {
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
    async signin(@Body() user: User) {
        const userData = await this.authService.signinUser(user);
        if(userData) {
            return userData;
        }
        
        return { error: 'Sorry, No user found with this name!'}
    }

    // get user info
    @Get('me/:id')
    me(@Param('id') id: string) {
        return this.authService.getUserById(id);
    }

    @Get('/users')
    users() {
        return this.authService.getUsers();
    }
}
