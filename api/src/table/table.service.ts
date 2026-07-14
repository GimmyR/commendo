import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.table.findMany({
            orderBy: {
                tableRef: "asc"
            }
        });
    }
}
