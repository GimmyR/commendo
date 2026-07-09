import { ApiBodyOptions } from "@nestjs/swagger";

export const CreateLanguageDoc: ApiBodyOptions = {
    schema: {
        title: "CreateLanguage",
        type: "object",
        properties: {
            type: { type: "number", example: 1 },
            name: { type: "string", example: "English" },
            abbrev: { type: "string", example: "eng" }
        },
        required: [ "name", "abbrev" ]
    }
};