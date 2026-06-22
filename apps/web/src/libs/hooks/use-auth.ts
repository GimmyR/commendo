import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JwtPayload {
    sub: number;
    name: string;
    roles: number[];
}

interface IAuth {
    token: string;
    account: JwtPayload;
    login: (token: string) => void;
    logout: () => void;
}

const baseAuth: Omit<IAuth, "login" | "logout"> = {
    token: null,
    account: null
};

export const useAuth = create<IAuth>()(
    persist(
        (set) => ({
            ...baseAuth,
            login: (token: string) => {
                const user = jwtDecode<JwtPayload>(token);
                console.log(user);
                set({ token, account: user });
            },
            logout: () => {
                set({ ...baseAuth });
            }
        }),
        { name: "auth-storage" }
    )
);