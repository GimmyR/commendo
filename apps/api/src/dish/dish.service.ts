import { Pagination } from '@/pagination/pagination.pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DishService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(language: string, pagination: Pagination) {
        const {page, take, skip} = pagination;
        const total = await this.prisma.dish.count();
        const pages = take ? Math.ceil(total / take) : 1;

        const dishes = await this.prisma.dish.findMany({
            skip,
            take,
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
