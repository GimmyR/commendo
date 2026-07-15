import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";
import { IsDefined, IsPositive } from "class-validator";

export class CreateOrder implements Partial<Order> {
    @IsDefined({ message: "Table ID is missing" })
    @IsPositive({ message: "Table ID should be a positive number" })
    @ApiProperty({ example: 1 })
    tableId!: number;

    @IsDefined({ message: "Dish ID is missing" })
    @IsPositive({ message: "Dish ID should be a positive number" })
    @ApiProperty({ example: 1 })
    dishId!: number;
}