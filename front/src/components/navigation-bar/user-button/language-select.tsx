import useLanguageSelect from "@/libs/hooks/use-language-select";
import type { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

export default function LanguageSelect() {
    const {languages, selectedLanguage, selectLang} = useLanguageSelect();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        selectLang(e.target.value);
    };

    if(languages.length == 0)
        return null;

    return (
        <Form.Select value={selectedLanguage ?? languages[0].abbrev} onChange={handleChange}>
            {languages.map(lang => <option key={lang.id} value={lang.abbrev}>{lang.name}</option>)}
        </Form.Select>
    );
}