import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
}
