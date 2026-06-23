import { cmdFetch } from "@/libs/utils/fetch";
import type { Language } from "@repo/shared";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

type Lang = Pick<Language, keyof Language>;

export default function LanguageSelect() {
    const [languages, setLanguages] = useState<Lang[]>([]);

    useEffect(() => {
        cmdFetch("/lang")
            .then(data => setLanguages(data))
            .catch(error => console.error(error));
    }, [languages, setLanguages]);

    return (
        <Form.Select>
            {languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
        </Form.Select>
    );
}