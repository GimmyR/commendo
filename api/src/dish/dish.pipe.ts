import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'class-validator';

export class FilterDishPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): Prisma.DishWhereInput {
        if (isEmpty(value)) return {};

        return this.buildFilter(value);
    }

    private buildFilter(value: string): Prisma.DishWhereInput {
        const conditions = value.split(';');
        const priceCond = {};
        const nameCond = {
            some: {
                name: {},
            },
        };

        for (const cond of conditions) {
            const [attr, operator, condValue] = cond.split(':');

            if (isEmpty(attr) || isEmpty(operator) || isEmpty(condValue)) throw new BadRequestException(`Bad parameter here : ${cond}`);

            if (attr === 'name' && operator === 'contains')
                nameCond.some.name = {
                    contains: condValue,
                    mode: 'insensitive',
                };
            else if (attr === 'price') {
                const nb = parseFloat(condValue);

                if (isNaN(nb) || nb < 0) throw new BadRequestException(`Price should be a positive number : ${condValue}`);

                priceCond[operator] = nb;
            }
        }

        return { names: nameCond, price: priceCond };
    }
}
