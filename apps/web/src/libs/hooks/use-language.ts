import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ILang {
    id: number | null;
    select: (id: number) => void;
}

export const useLanguage = create<ILang>()(
    persist(
        (set) => ({
            id: null,
            select(id: number) {
                set({ id })
            },
        }),
        { name: "language-store" }
    )
);