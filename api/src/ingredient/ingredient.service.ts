import { CreateIngredient, CreateIngredientName } from '@/ingredient/ingredient.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Ingredient } from '@prisma/client';

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

        for(const name of ingredient.names) {
            await this.createName(newIngredient.id, name);
        }

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
}
