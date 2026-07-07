import { useLanguage } from "@/libs/hooks/use-language";
import { cmdFetch } from "@/libs/utils/fetch";
import type { Language } from "@repo/shared";
import { useEffect, useState } from "react";

type Lang = Pick<Language, keyof Language>;

export default function useLanguageSelect() {
    const [languages, setLanguages] = useState<Lang[]>([]);
    const selectedLanguage = useLanguage((state) => state.lang);
    const selectLang = useLanguage((state) => state.select);

    const setupLanguages = (langs: Lang[]) => {
        setLanguages(langs);

        if(!selectedLanguage && langs.length > 0)
            selectLang(langs[0].abbrev);
    };

    useEffect(() => {
        cmdFetch("/lang")
            .then((langs: Lang[]) => setupLanguages(langs))
            .catch(error => console.error(error));
    }, []);

    return {languages, selectedLanguage, selectLang};
}