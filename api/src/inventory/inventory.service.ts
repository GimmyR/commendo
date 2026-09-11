import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(language: string) {
        return await this.prisma.ingredientMovement.findMany({
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
        });
    }
}
