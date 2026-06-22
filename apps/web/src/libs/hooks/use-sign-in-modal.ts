import type { SignUp } from "@repo/shared";
import { useState } from "react";

const accountPlaceholder: Partial<SignUp> = { username: "", password: "" };

export default function useSignInModal() {
    const [account, setAccount] = useState<Partial<SignUp>>(accountPlaceholder);

    const setUsername = (value: string) => {
        setAccount({...account, username: value})
    };

    const setPassword = (value: string) => {
        setAccount({...account, password: value})
    };

    const resetAccount = () => {
        setAccount({...accountPlaceholder});
    };

    return {account, setUsername, setPassword, resetAccount};
}