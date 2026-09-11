import { CreateMovement } from '@/inventory/inventory.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IngredientMovement } from '@prisma/client';

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

    async findUnique(id: number, language: string) {
        return await this.prisma.ingredientMovement.findUnique({
            where: { id },
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

    async create(movement: CreateMovement) {
        const newMovement: IngredientMovement = await this.prisma.ingredientMovement.create({
            data: {...movement}
        });

        return await this.prisma.ingredientMovement.findUnique({
            where: { id: newMovement.id },
            include: {
                ingredient: {
                    include: {
                        names: {
                            include: {
                                lang: true
                            }
                        }
                    }
                }
            }
        });
    }
}
