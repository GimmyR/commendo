import { AccountGuard } from '@/account/account.guard';
import { CreateIngredient, UpdateIngredient } from '@/ingredient/ingredient.dto';
import { IngredientService } from '@/ingredient/ingredient.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Create ingredient with name(s)" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Given ingredient has been successfully created" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Language not found" })
    async createIngredient(@Body() ingredient: CreateIngredient) {
        return await this.ingredientServ.create(ingredient);
    }

    @Patch()
    @UseGuards(AccountGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Update ingredient" })
    @ApiResponse({ status: HttpStatus.OK, description: "Ingredient has been successfully updated" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Language not found" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Ingredient not found" })
    async updateIngredient(@Body() ingredient: UpdateIngredient) {
        return await this.ingredientServ.update(ingredient);
    }

    @Delete(":id")
    @UseGuards(AccountGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Delete ingredient" })
    @ApiParam({ name: "id", type: Number, required: true, description: "ID of ingredient to remove" })
    @ApiResponse({ status: HttpStatus.OK, description: "Ingredient has been successfully removed" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Ingredient not found" })
    async deleteIngredient(@Param("id") id: number) {
        return await this.ingredientServ.delete(id);
    }
}
