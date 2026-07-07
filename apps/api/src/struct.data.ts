import { CreateAccountWithRoleAndLangAbbrev, CreateLanguage, CreateRoleWithLangAbbrev } from "@repo/shared";

export const struct_languages: CreateLanguage[] = [
    new CreateLanguage({ name: "Français", abbrev: "fr" })
];

export const struct_roles: CreateRoleWithLangAbbrev[] = [
    { name: "Admin", langAbbrev: "fr" }
];

export const struct_admin: CreateAccountWithRoleAndLangAbbrev = {
    username: "admin",
    password: "pwdAdmin",
    role: struct_roles[0]
};