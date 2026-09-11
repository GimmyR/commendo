import { AccountGuard } from '@/account/account.guard';
import { InventoryService } from '@/inventory/inventory.service';
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

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

    @Get(":id")
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Find unqiue movement with its ingredient in the specified language" })
    @ApiParam({ name: "id", type: "number", required: true, description: "ID of the movement", example: 1 })
    @ApiQuery({ name: "lang", type: "string", required: true, description: "Language of the name of the ingredient", example: "eng" })
    @ApiResponse({ status: HttpStatus.OK, description: "The movement has been successfully returned" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Movement not found" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Language not found" })
    async findUniqueMovement(@Param("id") id: number, @Query("lang") language: string) {
        return this.inventoryServ.findUnique(id, language);
    }
}
