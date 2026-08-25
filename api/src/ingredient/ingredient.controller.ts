import { AccountGuard } from '@/account/account.guard';
import { CreateIngredient } from '@/ingredient/ingredient.dto';
import { IngredientService } from '@/ingredient/ingredient.service';
import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
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

    @Post()
    @UseGuards(AccountGuard)
    @ApiOperation({ summary: "Create ingredient with name(s)" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Given ingredient has been successfully created" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Language not found" })
    async createIngredient(@Body() ingredient: CreateIngredient) {
        return await this.ingredientServ.create(ingredient);
    }
}
