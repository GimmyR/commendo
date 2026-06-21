import { LanguageItem } from "@repo/shared";
import { render, screen } from "@testing-library/react";
import Languages from "./languages";

const languages: LanguageItem[] = [
    { id: 1, name: "Français", abbrev: "fr" }
];

describe("Test Products component", () => {
    it("Should render products", () => {
        render(<Languages languages={languages}/>);
        const product = screen.getByText(`${languages[0].name} (${languages[0].abbrev})`);
        expect(product).toBeInTheDocument();
    });
});
