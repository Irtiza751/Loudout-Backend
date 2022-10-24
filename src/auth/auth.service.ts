import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    saveUser(user: Prisma.UserCreateInput) {
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
