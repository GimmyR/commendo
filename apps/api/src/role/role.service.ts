import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleRequest, CreateRoleWithLangAbbrev } from 'src/role/role.dto';

@Injectable()
export class RoleService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(role: CreateRoleRequest) {
        const roles = await this.getByRoleNameAndLangId(role);

        if(roles.length == 0)
            return await this.prisma.role.create({
                data: {
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

    async getByRoleNameAndLangId(role: CreateRoleRequest) {
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
