import useLanguageSelect from "@/libs/hooks/use-language-select";
import { Form } from "react-bootstrap";

export default function LanguageSelect() {
    const {languages, selectedLanguage} = useLanguageSelect();

    return (
        <Form.Select defaultValue={selectedLanguage ?? languages[0].id}>
            {languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
        </Form.Select>
    );
}