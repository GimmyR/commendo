import { AccountGuard } from '@/account/account.guard';
import { CreateOrder } from '@/order/order.dto';
import { OrderService } from '@/order/order.service';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth('access-token')
export class OrderController {
    constructor(private readonly orderServ: OrderService) {}

    @Post()
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Create order by table and dish" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Order has been successfully created" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Table or dish not found" })
    async createOrder(@Body() order: CreateOrder) {
        return await this.orderServ.create(order);
    }
}
