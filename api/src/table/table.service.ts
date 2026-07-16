import { PrismaService } from '@/prisma/prisma.service';
import { EditTable } from '@/table/table.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

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

    async findUniqueByIdWithOrders(language: string, id: number) {
        const table = await this.prisma.table.findUnique({
            where: { id },
            include: {
                orders: {
                    where: {
                        status: {
                            lt: 4
                        }
                    },
                    orderBy: {
                        id: "asc"
                    },
                    include: {
                        dish: {
                            include: {
                                names: {
                                    where: {
                                        lang: {
                                            abbrev: language
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if(!table)
            throw new NotFoundException(`Table not found : ${id}`);

        return table;
    }

    async update(id: number, table: EditTable) {
        return await this.prisma.table.update({
            where: { id },
            data: table
        });
    }
}
