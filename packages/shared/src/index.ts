import { isDefined, isEmpty, isPositive } from "class-validator";

export abstract class RequestDto {
    abstract validate(): string[];
}

//===================== LANGUAGE ==========================

export class CreateLanguage extends RequestDto {
    name!: string;
    abbrev!: string;

    constructor(lang: Partial<CreateLanguage>) {
        super();
        Object.assign(this, lang);
    }

    validate(): string[] {
        const errors: string[] = [];

        if(isEmpty(this.name)) errors.push("Name is missing");
        if(isEmpty(this.abbrev)) errors.push("Abbreviation is missing");

        return errors;
    }
}

export class Language {
    id!: number;
    name!: string;
    abbrev!: string;
}

//====================== ACCOUNT ===========================

export class SignIn extends RequestDto {
    username!: string;
    password!: string;

    constructor(account: Partial<SignIn>) {
        super();
        Object.assign(this, account);
    }

    validate(): string[] {
        const errors: string[] = [];

        if(isEmpty(this.username)) errors.push("Username is missing");
        if(isEmpty(this.password)) errors.push("Password is missing");

        return errors;
    }
}

export class CreateAccountWithRoleAndLangAbbrev {
    username!: string;
    password!: string;
    role!: CreateRoleWithLangAbbrev
}

export class EditPassword extends RequestDto {
    currentPassword!: string;
    newPassword!: string;

    constructor(account: Partial<EditPassword>) {
        super();
        Object.assign(this, account);
    }

    validate(): string[] {
        const errors: string[] = [];

        if(isEmpty(this.currentPassword)) errors.push("Current password is missing");
        if(isEmpty(this.newPassword)) errors.push("New password is missing");

        return errors;
    }
}

//==================== ROLE =========================

export class CreateRole extends RequestDto {
    type!: number;
    langId!: number;
    name!: string;

    constructor(role: Partial<CreateRole>) {
        super();
        Object.assign(this, role);
    }

    validate(): string[] {
        const errors: string[] = [];

        if(!isDefined(this.type)) errors.push("Role type is missing")
        if(!isPositive(this.type)) errors.push("Role type should be a positive number");
        if(!isDefined(this.langId)) errors.push("Language ID is missing");
        if(!isPositive(this.langId)) errors.push("Language ID should be a positive number");
        if(isEmpty(this.name)) errors.push("Name is missing");

        return errors;
    }
}

export class CreateRoleWithLangAbbrev {
    type!: number;
    name!: string;
    langAbbrev!: string;
}