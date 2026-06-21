import { CreateLanguage } from "@repo/shared";
import { CreateAccountWithRoleAndLangAbbrev } from "src/account/account.dto";
import { CreateRoleWithLangAbbrev } from "src/role/role.dto";

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