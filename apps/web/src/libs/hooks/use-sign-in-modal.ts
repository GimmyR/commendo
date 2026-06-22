import type { SignUp } from "@repo/shared";
import { useState, type ChangeEvent } from "react";

const credentialsPlaceholder: Partial<SignUp> = { username: "", password: "" };

export default function useSignInModal() {
    const [credentials, setCredentials] = useState<Partial<SignUp>>(credentialsPlaceholder);
    const [error, setError] = useState<string | undefined>();

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, username: event.target.value})
    };

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, password: event.target.value})
    };

    const resetAccount = () => {
        setCredentials({...credentialsPlaceholder});
    };

    return {credentials, setUsername, setPassword, resetAccount, error, setError};
}