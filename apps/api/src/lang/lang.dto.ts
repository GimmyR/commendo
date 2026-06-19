import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLanguageRequest {
    @IsNotEmpty({ message: "Name is missing" })
    @ApiProperty({ example: "English" })
    name: string;

    @IsNotEmpty({ message: "Abbreviation is missing" })
    @ApiProperty({ example: "eng" })
    abbrev: string;
}
