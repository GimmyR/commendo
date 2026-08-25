import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreateIngredientName {
    @IsNotEmpty({ message: "Language is missing" })
    @ApiProperty({ example: "eng" })
    lang!: string;

    @IsNotEmpty({ message: "Ingredient name is missing" })
    @ApiProperty({ example: "Rice" })
    name!: string;
}

export class CreateIngredient {
    @IsNotEmpty({ message: "Unit is missing" })
    @ApiProperty({ example: "g" })
    unit!: string;

    @IsArray({ message: "Names should be an array" })
    names!: CreateIngredientName[];
}