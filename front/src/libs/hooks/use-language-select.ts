import { fetchAllLanguages, type Language } from "@/libs/actions/language";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useLanguageSelect() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const selectedLanguage = useLanguage((state) => state.lang);
    const selectLang = useLanguage((state) => state.select);

    const setupLanguages = (langs: Language[]) => {
        setLanguages(langs);

        if(!selectedLanguage && langs.length > 0)
            selectLang(langs[0].abbrev);
    };

    useEffect(() => {
        fetchAllLanguages()
            .then((langs: Language[]) => setupLanguages(langs))
            .catch(error => console.error(error));
    }, []);

    return {languages, selectedLanguage, selectLang};
}