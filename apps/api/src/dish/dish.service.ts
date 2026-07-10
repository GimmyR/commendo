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
            where: {
                names: {
                    some: {
                        lang: {
                            abbrev: language
                        }
                    }
                },
                ingredients: {
                    some: {
                        ingredient: {
                            names: {
                                some: {
                                    lang: {
                                        abbrev: language
                                    }
                                }
                            }
                        }
                    }
                }
            },
            include: {
                names: true,
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });

        return { total, pages, data: dishes };
    }
}
