import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateMovement {
    @IsDefined({ message: "Ingredient ID is missing" })
    @IsInt({ message: "Ingredient ID should be an integer" })
    @IsPositive({ message: "Ingredient ID should be a positive integer" })
    @ApiProperty({ description: "Ingredient ID", example: 1 })
    ingredientId!: number;

    @IsDefined({ message: "Movement type is missing" })
    @IsInt({ message: "Movement type should be an integer" })
    @ApiProperty({ description: "Type of the movement", example: 1 })
    type!: number;

    @IsDefined({ message: "Quantity is missing" })
    @IsPositive({ message: "Quantity should be a positive number" })
    @ApiProperty({ description: "Quantity of the movement", example: 10000 })
    quantity!: number;

    @IsOptional()
    @IsPositive({ message: "Purchase price should be a positive number" })
    @ApiProperty({ required: false, description: "Purchase price of the movement if the type is 1", example: 50000 })
    purchasePrice?: number;

    constructor(movement: Partial<CreateMovement>) {
        Object.assign(this, movement);
    }
}

export class UpdateMovement {
    @IsDefined({ message: "Movement ID is missing" })
    @IsInt({ message: "Movement ID should be an integer" })
    @IsPositive({ message: "Movement ID should be a positive integer" })
    @ApiProperty({ description: "ID of the movement", example: 1 })
    id!: number;

    @IsOptional()
    @IsInt({ message: "Ingredient ID should be an integer" })
    @IsPositive({ message: "Ingredient ID should be a positive integer" })
    @ApiProperty({ description: "Ingredient ID", example: 1 })
    ingredientId?: number;

    @IsOptional()
    @IsInt({ message: "Movement type should be an integer" })
    @ApiProperty({ description: "Type of the movement", example: 1 })
    type?: number;

    @IsOptional()
    @IsPositive({ message: "Quantity should be a positive number" })
    @ApiProperty({ description: "Quantity of the movement", example: 10000 })
    quantity?: number;

    @IsOptional()
    @IsPositive({ message: "Purchase price should be a positive number" })
    @ApiProperty({ required: false, description: "Purchase price of the movement if the type is 1", example: 50000 })
    purchasePrice?: number;

    constructor(movement: Partial<UpdateMovement>) {
        Object.assign(this, movement);
    }
}