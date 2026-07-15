import { CreateOrder } from '@/order/order.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async create(order: CreateOrder) {
        return await this.prisma.order.create({
            data: {
                ...order,
                status: 0
            }
        });
    }
}
