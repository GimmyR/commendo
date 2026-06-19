import { IsDefined, IsNotEmpty, IsPositive } from "class-validator";

export class CreateRoleRequest {
    @IsDefined({ message: "Language ID is missing" })
    @IsPositive({ message: "Language ID should be a positive number" })
    langId: number;

    @IsNotEmpty({ message: "Role name is missing" })
    name: string;
}

export class CreateRoleWithLangAbbrev {
    name: string;
    langAbbrev: string;
}