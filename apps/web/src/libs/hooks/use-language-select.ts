import { useLanguage } from "@/libs/hooks/use-language";
import { cmdFetch } from "@/libs/utils/fetch";
import type { Language } from "@repo/shared";
import { useEffect, useState } from "react";

type Lang = Pick<Language, keyof Language>;

export default function useLanguageSelect() {
    const [languages, setLanguages] = useState<Lang[]>([]);
    const selectedLanguage = useLanguage((state) => state.id);
    const selectLang = useLanguage((state) => state.select);

    const setupLanguages = (langs: Lang[]) => {
        setLanguages(langs);

        if(langs.length > 0)
            selectLang(langs[0].id);
    };

    useEffect(() => {
        cmdFetch("/lang")
            .then((langs: Lang[]) => setupLanguages(langs))
            .catch(error => console.error(error));
    }, [languages, setLanguages]);

    return {languages, selectedLanguage};
}