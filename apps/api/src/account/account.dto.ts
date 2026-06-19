import { IsNotEmpty } from "class-validator";
import { CreateRoleWithLangAbbrev } from "src/role/role.dto";

export class SignUpRequest {
    @IsNotEmpty({ message: "Username is missing" })
    username: string;

    @IsNotEmpty({ message: "Password is missing" })
    password: string;
}

export class CreateAccountWithRoleAndLangAbbrev {
    username: string;
    password: string;
    role: CreateRoleWithLangAbbrev
}

export class EditPasswordRequest {
    @IsNotEmpty({ message: "Current password is missing" })
    currentPassword: string;

    @IsNotEmpty({ message: "New password is missing" })
    newPassword: string;
}
