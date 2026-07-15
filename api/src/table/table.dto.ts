import { ApiProperty } from "@nestjs/swagger";
import { Table } from "@prisma/client";
import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class EditTable implements Partial<Table> {
    @IsOptional()
    @IsNotEmpty({ message: "Table reference is missing" })
    @ApiProperty({ description: "Table reference", example: "01" })
    tableRef!: string;

    @IsOptional()
    @IsDefined({ message: "Table availability is missing" })
    @ApiProperty({ 
        description: `Availability of table :<br/>
        * 0: Unavailable
        * 1: Available
        * 2: Occupied`, 
        example: 1 
    })
    availability!: number;

    constructor(table: Partial<EditTable>) {
        Object.assign(this, table);
    }
}