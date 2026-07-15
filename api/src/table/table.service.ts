import { PrismaService } from '@/prisma/prisma.service';
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
                            not: 4
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
}
