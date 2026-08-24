import { IngredientService } from '@/ingredient/ingredient.service';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ingredient')
@ApiTags("ingredient")
export class IngredientController {
    constructor(
        private readonly ingredientServ: IngredientService
    ) {}

    @Get()
    @ApiOperation({ summary: "Find all ingredients in relation to a language" })
    @ApiQuery({ name: "lang", type: String, required: true, description: "Language to use for ingredients", example: "eng" })
    @ApiResponse({ status: HttpStatus.OK, description: "All ingredients has been successfully returned with the right language" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Unexpected error occurs" })
    async findAllIngredients(@Query("lang") language: string) {
        return await this.ingredientServ.findAll(language);
    }
}
