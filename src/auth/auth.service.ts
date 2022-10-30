import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async saveUser(user: Prisma.UserCreateInput) {
        // hashing user password before saving into the database.
        const hashPassword = await bcrypt.hash(user.password, 10);
        // assigning the auth token to the user.
        const token = jwt.sign(user.email, process.env.JWT_SECRET);

        Object.assign(user, { password: hashPassword, tokens: [token]});
        return this.prisma.user.create({ data: user });
    }

    // get the signle user with the provided email
    getUser(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
    
    // get the signle user with the provided email
    getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id: Number(id) }
        });
    }
}
