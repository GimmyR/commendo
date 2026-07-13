import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRole, CreateRoleWithLangAbbrev } from '@repo/shared';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(role: CreateRole) {
        const roles = await this.getByRoleNameAndLangId(role);

        if(roles.length == 0)
            return await this.prisma.role.create({
                data: {
                    type: role.type,
                    names: {
                        create: {
                            name: role.name,
                            langId: role.langId
                        }
                    }
                },
                include: {
                    names: true
                }
            });

        else if(roles.length == 1)
            return roles[0];

        else throw new InternalServerErrorException(`Too many role names found for : ${role}`);
    }

    async getUniqueByType(type: number) {
        return await this.prisma.role.findUnique({
            where: { type }
        });
    }

    async getByRoleNameAndLangId(role: CreateRole) {
        return await this.prisma.role.findMany({
            where: {
                names: {
                    some: {
                        name: role.name,
                        langId: role.langId
                    }
                }
            },
            include: {
                names: true
            }
        });
    }

    async getUniqueByRoleNameAndLangAbbrev(role: CreateRoleWithLangAbbrev) {
        const result = await this.prisma.role.findMany({
            where: {
                names: {
                    some: {
                        name: role.name,
                        lang: {
                            abbrev: role.langAbbrev
                        }
                    }
                }
            },
            include: {
                names: true
            }
        });

        if(result.length == 1)
            return result[0];

        else if(result.length == 0)
            return undefined;

        else throw new InternalServerErrorException(`Too many result for unique search : ${role}`);
    }
}
