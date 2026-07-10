import { DishService } from '@/dish/dish.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('dish')
export class DishController {
    constructor(
        private readonly dishServ: DishService
    ) {}

    @Get()
    async findAll(
        @Query("lang") language: string, 
        @Query("page") page: number, 
        @Query("limit") limit: number
    ) {
        return await this.dishServ.findAll(language, page, limit);
    }
}
