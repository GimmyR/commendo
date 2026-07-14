import { filterDoc, langDoc, limitDoc, pageDoc } from '@/dish/dish.doc';
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
    @ApiQuery(langDoc)
    @ApiQuery(pageDoc)
    @ApiQuery(limitDoc)
    @ApiQuery(filterDoc)
    @ApiResponse({ status: HttpStatus.OK, description: 'Dishes have been successfully returned' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async findAll(
        @Query('lang') language: string,
        @Query('filter', FilterDishPipe) filter: Prisma.DishWhereInput,
        @Query(PaginationPipe) pagination: Pagination,
    ) {
        return await this.dishServ.findAll(language, pagination, filter);
    }
}
