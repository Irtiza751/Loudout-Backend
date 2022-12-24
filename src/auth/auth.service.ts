import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './auth.controller';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async saveUser(user: Prisma.UserCreateInput) {
        // hashing user password before saving into the database.
        const hashPassword = await bcrypt.hash(user.password, 10);
        // assigning the auth token to the user.
        const token = this.generateJWT(user);

        Object.assign(user, { password: hashPassword, tokens: [token] });
        return this.prisma.user.create({ 
            data: user,
            select: { id: true, name: true, email: true, profileImg: true, tokens: true }
         });
    }

    // signin user
    async signinUser(user: User) {
        // find user with it's email
        const userFound = await this.prisma.user.findUnique({ where: { email: user.email }});
        // verifiy it's password is correct or not
        const passwordVerified = await bcrypt.compare(user.password, userFound.password);

        if(passwordVerified) {
            const token = this.generateJWT(user);
            const signedUser = this.prisma.user.update({
                select: { email: true, name: true, profileImg: true, tokens: true },
                where: { email: user.email },
                data: { tokens: [token] }
            });
            return signedUser;
        }
        return null;
    }

    // get the signle user with the provided email
    getUser(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    // get the signle user with the provided email
    getUserById(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    private generateJWT(user: User) {
        return jwt.sign(user.email, process.env.JWT_SECRET);
    }
}
