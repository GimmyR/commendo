import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Table {
    tablename: string
}

@Injectable()
export class CleanerService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async reinitDatabase() {
        try {
            const tables = await this.getAllTables();

            if(tables.length > 0) {
                const strTables = tables.map((t) => `"${t.tablename}"`).join(', ');
                await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${strTables} RESTART IDENTITY CASCADE;`);
            }
            
            console.log('✅ All tables have been reinitialized');
        } catch (error) {
            console.error('❌ Reinitialization of tables has failed :', error);
            throw error;
        }
    }

    private async getAllTables() {
        return await this.prisma.$queryRaw<Table[]>`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname='public' 
            AND tablename NOT IN ('_prisma_migrations');
        `;
    }
}
