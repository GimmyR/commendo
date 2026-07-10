import { ApiBodyOptions } from "@nestjs/swagger";

export const SignInDoc: ApiBodyOptions = {
    schema: {
        title: "SignIn",
        type: "object",
        properties: {
            username: { type: "string", example: "johndoe" },
            password: { type: "string", example: "pwdJohn" }
        },
        required: ["username", "password"]
    }
};

export const EditPasswordDoc: ApiBodyOptions = {
    schema: {
        title: "EditPassword",
        type: "object",
        properties: {
            currentPassword: { type: "string", example: "pwd123" },
            newPassword: { type: "string", example: "pwd456" }
        },
        required: ["currentPassword", "newPassword"]
    }
};