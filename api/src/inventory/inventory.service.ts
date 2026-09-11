import { CreateMovement, UpdateMovement } from '@/inventory/inventory.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findUniqueWithAllLanguages(id: number) {
        return await this.prisma.ingredientMovement.findUnique({
            where: { id },
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

    async create(movement: CreateMovement) {
        const newMovement: IngredientMovement = await this.prisma.ingredientMovement.create({
            data: {...movement}
        });

        return await this.findUniqueWithAllLanguages(newMovement.id);
    }

    async update(movement: UpdateMovement) {
        const {id, ...movementWithoutId} = movement;

        const current: IngredientMovement | null = await this.prisma.ingredientMovement.findUnique({
            where: { id }
        });

        if(!current) throw new NotFoundException();

        const newMovement: IngredientMovement = await this.prisma.ingredientMovement.update({
            where: { id },
            data: {...movementWithoutId}
        });

        return await this.findUniqueWithAllLanguages(newMovement.id);
    }
}
