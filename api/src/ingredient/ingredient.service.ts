import { CreateIngredient, CreateIngredientName, UpdateIngredient } from '@/ingredient/ingredient.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingredient, Lang } from '@prisma/client';

@Injectable()
export class IngredientService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(language: string) {
        return await this.prisma.ingredient.findMany({
            include: {
                names: {
                    where: {
                        lang: {
                            abbrev: language
                        }
                    }
                }
            }
        });
    }

    async create(ingredient: CreateIngredient) {
        const newIngredient = await this.prisma.ingredient.create({
            data: {
                unit: ingredient.unit,
                active: true
            }
        });

        for(const name of ingredient.names)
            await this.createName(newIngredient.id, name);

        return newIngredient;
    }

    async createName(ingredientId: number, name: CreateIngredientName) {
        await this.prisma.ingredient.update({
            where: {
                id: ingredientId
            },
            data: {
                names: {
                    create: {
                        lang: {
                            connect: {
                                abbrev: name.lang
                            }
                        },
                        name: name.name
                    }
                }
            }
        });
    }

    async update(ingredient: UpdateIngredient) {
        if(ingredient.names) {
            for(const name of ingredient.names)
                await this.updateName(ingredient.id, name);
        }

        const { id, ...ingredientWithoutId } = ingredient;
        const { names, ...ingredientWithoutNames } = ingredientWithoutId;

        return await this.prisma.ingredient.update({
            where: { id },
            data: {
                ...ingredientWithoutNames
            },
            include: {
                names: {
                    include: {
                        lang: true
                    }
                }
            }
        });
    }

    async updateName(ingredientId: number, name: CreateIngredientName) {
        const lang: Lang | null = await this.prisma.lang.findUnique({
            where: {
                abbrev: name.lang
            }
        });

        if(!lang)
            throw new NotFoundException("Language not found");

        await this.prisma.ingredientName.update({
            where: {
                ingredientId_langId: {
                    ingredientId,
                    langId: lang.id
                }
            },
            data: {
                name: name.name
            }
        });
    }
}
