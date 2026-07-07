import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "@/i18n";

interface ILang {
    lang: string;
    select: (newLang: string) => void;
}

export const useLanguage = create<ILang>()(
    persist(
        (set) => ({
            lang: "fr",
            select(newLang: string) {
                set({ lang: newLang });
                i18n.changeLanguage(newLang);
            },
        }),
        { 
            name: "language-store",
            onRehydrateStorage: () => (state) => {
                if(state)
                    i18n.changeLanguage(state.lang)
            }
        }
    )
);