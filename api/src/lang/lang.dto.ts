import { IsNotEmpty } from 'class-validator';

export class CreateLanguage {
    @IsNotEmpty({ message: 'Name is missing' })
    name!: string;

    @IsNotEmpty({ message: 'Abbreviation is missing' })
    abbrev!: string;

    constructor(language: Partial<CreateLanguage>) {
        Object.assign(this, language);
    }
}

export interface Language {
    id: number;
    name: string;
    abbrev: string;
}
