import { CreateAccountWithRoleAndLangAbbrev } from "@/account/account.dto";
import { CreateLanguage } from "@/lang/lang.dto";
import { CreateRoleWithLangAbbrev } from "@/role/role.dto";

export const struct_languages: CreateLanguage[] = [
    new CreateLanguage({ name: "Français", abbrev: "fr" }),
    new CreateLanguage({ name: "English", abbrev: "eng" }),
];

export const struct_roles: CreateRoleWithLangAbbrev[] = [
    { type: 1, name: "Admin", langAbbrev: "fr" }
];

export const struct_admin: CreateAccountWithRoleAndLangAbbrev = {
    username: "admin",
    password: "pwdAdmin",
    role: struct_roles[0]
};