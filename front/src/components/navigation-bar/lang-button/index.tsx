import { Dropdown } from "react-bootstrap";
import "./index.css";
import useLanguages from "@/libs/hooks/use-languages";
import type { Language } from "@/libs/actions/language";

export default function LangButton() {
    const {languages, selectedLanguage, selectLang} = useLanguages();
    
    const handleClick = (lang: Language) => {
        selectLang(lang.abbrev);
    };

    if(languages.length == 0)
        return null;

    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="success" className="px-2 py-0 lang-btn">
                <i className="bi bi-globe"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {languages.map(language => <Dropdown.Item key={language.id} href="#" onClick={() => handleClick(language)} className={`text-center ${selectedLanguage == language.abbrev && "text-success"}`}>
                    {language.name}
                </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}