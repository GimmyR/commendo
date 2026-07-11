import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DishService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(language: string, page?: number, limit?: number) {
        const total = await this.prisma.dish.count();
        const skip = page && limit ? (page - 1) * limit : 0;
        const pages = limit ? Math.ceil(total / limit) : 1;

        const dishes = await this.prisma.dish.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "asc"
            },
            include: {
                names: {
                    where: {
                        lang: {
                            abbrev: language
                        }
                    }
                },
                ingredients: {
                    include: {
                        ingredient: {
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

        return { total, pages, data: dishes };
    }
}
