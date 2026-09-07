import IngredientNameInput from "@/components/ingredients/ingredient-name-input";
import { render, screen } from "@testing-library/react";

describe("Test IngredientNameInput", () => {
    it("Should display language and Lorem ipsum", () => {
        render(<IngredientNameInput value="" language="English (eng)" onChange={() => {}}/>);
        const language = screen.getByDisplayValue("English (eng)")
        expect(language).toBeInTheDocument();
        const input = screen.getByPlaceholderText("Lorem ipsum");
        expect(input).toBeInTheDocument();
    });

    it("Should display language and value", () => {
        render(<IngredientNameInput value="Rice" language="English (eng)" onChange={() => {}}/>);
        const language = screen.getByDisplayValue("English (eng)")
        expect(language).toBeInTheDocument();
        const input = screen.getByPlaceholderText("Lorem ipsum");
        expect(input).toBeInTheDocument();
        expect(input).toHaveDisplayValue("Rice");
    });
});