import { useAuth } from "@/libs/hooks/use-auth";
import type { SignIn } from "@repo/shared";
import { useState, type ChangeEvent } from "react";

type ISignIn = Omit<Pick<SignIn, keyof SignIn>, "validate">;

const credentialsPlaceholder: ISignIn = { username: "", password: "" };

export default function useSignInModal() {
    const [credentials, setCredentials] = useState<ISignIn>(credentialsPlaceholder);
    const [error, setError] = useState<string | undefined>();
    const login = useAuth((state) => state.login);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, username: event.target.value})
    };

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, password: event.target.value})
    };

    const resetAccount = () => {
        setCredentials({...credentialsPlaceholder});
    };

    return { 
        credentials, setUsername, setPassword, resetAccount, 
        error, setError, login, submitting, setSubmitting
    };
}