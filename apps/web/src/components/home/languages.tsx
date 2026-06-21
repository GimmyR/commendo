import type { LanguageItem } from "@repo/shared";
import { Stack } from "react-bootstrap";

type Props = {
    languages: LanguageItem[]
};

export default function Languages({ languages } : Props) {
    return (
        <Stack direction="vertical">
            {languages.map(lang => <div key={lang.id}>
                {lang.name} ({lang.abbrev})
            </div>)}
        </Stack>
    );
}