import { cmdFetch } from "../utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface SignIn {
    username: string;
    password: string;
}

// ======================================== FUNCTIONS ==============================================

export async function signIn(account: SignIn) {
    return await cmdFetch("/account/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account)
    });
}