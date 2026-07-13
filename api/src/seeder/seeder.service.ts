import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { Lang } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { LangService } from 'src/lang/lang.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleWithNames } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { struct_admin, struct_languages, struct_roles } from '@/struct.data';
import { CreateRole } from '@/role/role.dto';
import { SignIn } from '@/account/account.dto';

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        private readonly langServ: LangService,
        private readonly roleServ: RoleService,
        private readonly accountServ: AccountService
    ) {}

    async onModuleInit() {
        const needed = await this.needSeeding();

        if(needed)
            await this.seedStructData();
    }

    private async needSeeding() {
        const countLang = await this.prisma.lang.count();
        const countRole = await this.prisma.role.count();

        return countLang == 0 && countRole == 0;
    }

    private async seedStructData() {
        const languages = await this.seedLanguages();
        const roles = await this.seedRoles(languages);
        await this.seedAdmin(roles, languages);
    }

    private async seedLanguages() {
        return await Promise.all(struct_languages.map(async (lang) => {
            if(!lang || !lang.name || !lang.abbrev)
                throw new InternalServerErrorException(`Struct data (language) is invalid : ${lang}`);

            return await this.langServ.create(lang);
        }));
    }

    private async seedRoles(languages: Lang[]) {
        return await Promise.all(struct_roles.map(async (role) => {
            const lang = languages.find(lang => lang.abbrev == role.langAbbrev);

            if(!lang) throw new InternalServerErrorException(`Struct data (language) not found : ${role.langAbbrev}`);

            if(!role || !role.name || !role.langAbbrev)
                throw new InternalServerErrorException(`Struct data (role) is invalid : ${role}`);

            return await this.roleServ.create(new CreateRole({ type: role.type, name: role.name, langId: lang.id }));
        }));
    }

    private async seedAdmin(roles: RoleWithNames[], languages: Lang[]) {
        const role = roles.find(r => r.type == struct_admin.role.type);

        if(!role) throw new InternalServerErrorException(`Struct data (roles) not found : ${struct_admin.role}`);

        return await this.accountServ.create(new SignIn({
            username: struct_admin.username,
            password: struct_admin.password
        }), role.id);
    }
}
