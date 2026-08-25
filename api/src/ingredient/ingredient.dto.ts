import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreateIngredientName {
    @IsNotEmpty({ message: "Language is missing" })
    @ApiProperty({ example: "eng" })
    lang!: string;

    @IsNotEmpty({ message: "Ingredient name is missing" })
    @ApiProperty({ example: "Rice" })
    name!: string;

    constructor(name: Partial<CreateIngredientName>) {
        Object.assign(this, name);
    }
}

export class CreateIngredient {
    @IsNotEmpty({ message: "Unit is missing" })
    @ApiProperty({ example: "g" })
    unit!: string;

    @IsArray({ message: "Names should be an array" })
    @ApiProperty({ example: [{ lang: "eng", name: "Rice" }] })
    names!: CreateIngredientName[];

    constructor(ingredient: Partial<CreateIngredient>) {
        Object.assign(this, ingredient);
    }
}