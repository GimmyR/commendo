import { CreateRoleWithLangAbbrev } from "@/role/role.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignIn {
    @IsNotEmpty({ message: "Username is missing" })
    @ApiProperty({ example: "johndoe" })
    username!: string;

    @IsNotEmpty({ message: "Password is missing" })
    @ApiProperty({ example: "pwdJohn" })
    password!: string;

    constructor(user: Partial<SignIn>) {
        Object.assign(this, user);
    }
}

export interface CreateAccountWithRoleAndLangAbbrev {
    username: string;
    password: string;
    role: CreateRoleWithLangAbbrev
}

export class EditPassword {
    @IsNotEmpty({ message: "Current password is missing" })
    @ApiProperty({ example: "pwd123" })
    currentPassword!: string;

    @IsNotEmpty({ message: "New password is missing" })
    @ApiProperty({ example: "pwd456" })
    newPassword!: string;

    constructor(passwords: Partial<EditPassword>) {
        Object.assign(this, passwords);
    }
}