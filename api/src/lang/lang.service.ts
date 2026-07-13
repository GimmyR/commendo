import { CreateLanguage } from '@/lang/lang.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LangService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getAll() {
        return await this.prisma.lang.findMany();
    }

    async getUniqueByAbbreviation(abbrev: string) {
        const lang = await this.prisma.lang.findUnique({
            where: {
                abbrev: abbrev
            }
        });

        if(!lang) throw new NotFoundException("Language not found");

        return lang;
    }

    async create(language: CreateLanguage) {
        return await this.prisma.lang.upsert({
            where: { name: language.name, abbrev: language.abbrev },
            update: {},
            create: { name: language.name, abbrev: language.abbrev }
        });
    }
}