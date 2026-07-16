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

export class EditOrder implements Partial<Order> {
    @IsDefined({ message: "Status is missing" })
    @IsPositive({ message: "Status should be a positive number or zero between 0 and 4" })
    @ApiProperty({ 
        description: `An order has 5 distinct status :
        * 0: To confirm
        * 1: To do
        * 2: In progress
        * 3: Done
        * 4: Cancelled
        * 5: Archived`, 
        example: 1 
    })
    status!: number;
}