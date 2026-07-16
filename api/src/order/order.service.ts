import { CreateOrder, EditOrder } from '@/order/order.dto';
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

    async deleteById(orderId: number) {
        return await this.prisma.order.delete({
            where: {
                id: orderId
            }
        });
    }

    async updateById(orderId: number, order: EditOrder) {
        return await this.prisma.order.update({
            where: { id: orderId },
            data: order
        });
    }

    async findAll(language: string) {
        return await this.prisma.order.findMany({
            orderBy: { id: "asc" },
            include: {
                table: true,
                dish: {
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
