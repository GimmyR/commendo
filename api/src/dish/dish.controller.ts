import { FilterDishPipe } from '@/dish/dish.pipe';
import { DishService } from '@/dish/dish.service';
import { type Pagination, PaginationPipe } from '@/pagination/pagination.pipe';
import { Controller, Get, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@Controller('dish')
@ApiTags('dish')
export class DishController {
    constructor(private readonly dishServ: DishService) {}

    @Get()
    @ApiOperation({ summary: 'Find all dishes' })
    @ApiQuery({ name: 'lang', required: true, type: String, example: 'fr' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({
        name: 'filter',
        required: false,
        type: String,
        description:
            "Filter by name (contains) or price (equals, gt, gte, lt, lte). Operator should start and end with ':'. You can do many conditions by separating them with ';'.",
        example: 'name:contains:maza;price:gte:10000',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Dishes have been successfully returned',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Unknown error',
    })
    async findAll(
        @Query('lang') language: string,
        @Query('filter', FilterDishPipe) filter: Prisma.DishWhereInput,
        @Query(PaginationPipe) pagination: Pagination,
    ) {
        return await this.dishServ.findAll(language, pagination, filter);
    }
}
