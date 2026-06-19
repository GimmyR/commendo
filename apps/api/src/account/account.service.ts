import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EditPasswordRequest, SignUpRequest } from 'src/account/account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { Account, Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AccountService {
    private salt: number;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {
        const salt = process.env.SALT;

        if(!salt) throw new InternalServerErrorException("Salt is undefined");

        this.salt = parseInt(salt);
    }

    async findByUsername(username: string) {
        return await this.prisma.account.findUnique({
            where: {
                username: username
            },
            include: {
                roles: true
            }
        });
    }

    async create(account: SignUpRequest, roleId?: number) {
        const user = await this.findByUsername(account.username);

        if(user) throw new ConflictException(`Account with username as '${account.username}' already exists`);

        return await this.prisma.account.upsert({
            where: {
                username: account.username,
                roles: {
                    some: {
                        id: roleId
                    }
                }
            },
            update: {},
            create: {
                ...account,
                password: await bcrypt.hash(account.password, this.salt),
                roles: roleId ? {
                    connect: {
                        id: roleId
                    }
                } : undefined
            }
        });
    }

    async generateToken(account: Account & { roles: Role[] }) {
        const payload = {
            sub: account.id,
            name: account.username,
            roles: account.roles.map(role => role.id)
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async verifyToken(token: string) {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return payload;
        } catch {
            throw new UnauthorizedException("Invalid token");
        }
    }

    async comparePasswords(plainText: string, hashed: string) {
        return await bcrypt.compare(plainText, hashed);
    }

    async editPassword(request: Request, edit: EditPasswordRequest) {
        const account = await this.confirmIdentity(request, edit);

        return await this.prisma.account.update({
            where: {
                id: account.id
            },
            data: {
                password: await bcrypt.hash(edit.newPassword, this.salt)
            }
        });
    }

    private async confirmIdentity(request: Request, edit: EditPasswordRequest) {
        const account = await this.prisma.account.findUnique({
            where: {
                id: request["user"].sub,
                username: request["user"].name
            }
        });

        if(!account || !(await this.comparePasswords(edit.currentPassword, account.password)))
            throw new UnauthorizedException("Access token or password is invalid");

        return account;
    }
}