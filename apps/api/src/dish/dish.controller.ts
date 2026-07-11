import { DishService } from '@/dish/dish.service';
import { Controller, Get, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('dish')
@ApiTags('dish')
export class DishController {
    constructor(
        private readonly dishServ: DishService
    ) {}

    @Get()
    @ApiOperation({ summary: "Find all dishes" })
    @ApiQuery({ name: "lang", required: true, type: String, example: "fr" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
    @ApiResponse({ status: HttpStatus.OK, description: "Dishes have been successfully returned" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Unknown error" })
    async findAll(
        @Query("lang") language: string, 
        @Query("page", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, optional: true })) page: number, 
        @Query("limit", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, optional: true })) limit: number
    ) {
        return await this.dishServ.findAll(language, page, limit);
    }
}
