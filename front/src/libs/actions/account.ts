import type { SignUp } from "@repo/shared";
import { cmdFetch } from "../utils/fetch";

export async function signIn(account: Partial<SignUp>) {
    return await cmdFetch("/account/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account)
    });
}