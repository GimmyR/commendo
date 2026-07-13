import { IsDefined, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRole {
    @IsDefined({ message: 'Role type is missing' })
    @IsPositive({ message: 'Role type should be a positive number' })
    type!: number;

    @IsDefined({ message: 'Language ID is missing' })
    @IsPositive({ message: 'Language ID should be a positive number' })
    langId!: number;

    @IsNotEmpty({ message: 'Name is missing' })
    name!: string;

    constructor(role: Partial<CreateRole>) {
        Object.assign(this, role);
    }
}

export interface CreateRoleWithLangAbbrev {
    type: number;
    name: string;
    langAbbrev: string;
}
