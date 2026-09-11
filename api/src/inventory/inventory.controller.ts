import { AccountGuard } from '@/account/account.guard';
import { InventoryService } from '@/inventory/inventory.service';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryServ: InventoryService
    ) {}

    @Get()
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Find all movements with their ingredient in the specified language" })
    @ApiQuery({ name: "lang", type: "string", required: true, description: "Language of the name of the ingredient", example: "eng" })
    @ApiResponse({ status: HttpStatus.OK, description: "All movements have been successfully returned" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Language not found" })
    async findAllMovements(@Query("lang") language: string) {
        return this.inventoryServ.findAll(language);
    }
}
