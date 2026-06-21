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

export class LanguageItem {
    id!: number;
    name!: string;
    abbrev!: string;
}