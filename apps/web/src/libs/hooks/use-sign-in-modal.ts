import type { SignUp } from "@repo/shared";
import { useState, type ChangeEvent } from "react";

const accountPlaceholder: Partial<SignUp> = { username: "", password: "" };

export default function useSignInModal() {
    const [account, setAccount] = useState<Partial<SignUp>>(accountPlaceholder);
    const [error, setError] = useState<string | undefined>();

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setAccount({...account, username: event.target.value})
    };

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setAccount({...account, password: event.target.value})
    };

    const resetAccount = () => {
        setAccount({...accountPlaceholder});
    };

    return {account, setUsername, setPassword, resetAccount, error, setError};
}