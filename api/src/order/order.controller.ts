import { AccountGuard } from '@/account/account.guard';
import { CreateOrder, EditOrder } from '@/order/order.dto';
import { OrderService } from '@/order/order.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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

    @Delete(":id")
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Delete order by id" })
    @ApiParam({ name: "id", description: "Order ID", type: Number, required: true, example: 1 })
    @ApiResponse({ status: HttpStatus.OK, description: "Order has been successfully removed" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Order not found" })
    async deleteOrder(@Param("id") id: number) {
        return await this.orderServ.deleteById(id);
    }

    @Patch(":id")
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Partially edit order" })
    @ApiParam({ name: "id", description: "Order ID", type: Number, required: true, example: 1 })
    @ApiResponse({ status: HttpStatus.OK, description: "Order has been successfully edited" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Order not found" })
    async partiallyEditOrder(@Param("id") id: number, @Body() order: EditOrder) {
        return await this.orderServ.updateById(id, order);
    }

    @Get()
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Find all orders" })
    @ApiQuery({ name: "lang", type: String, required: true, example: "fr" })
    @ApiResponse({ status: HttpStatus.OK, description: "All orders have been successfully returned" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token is missing or invalid" })
    async findAllOrders(@Query("lang") lang: string) {
        return await this.orderServ.findAll(lang);
    }
}
