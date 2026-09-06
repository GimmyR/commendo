import IngredientsList from "@/components/ingredients/list";
import type { Ingredient } from "@/libs/actions/ingredients";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@/i18n";

const ingredient: Ingredient = {
    id: 1,
    unit: "g",
    active: true,
    names: [
        {
            langId: 1,
            ingredientId: 1,
            name: "Rice",
            lang: {
                id: 1,
                abbrev: "fr",
                name: "Français"
            }
        }
    ]
};

describe("Test IngredientsList", () => {
    it("Should display ingredients", () => {
        render(<MemoryRouter>
            <IngredientsList ingredients={[ingredient]} selectToEdit={() => {}} selectToToggleStatus={() => {}} selectToDelete={() => {}}/>
        </MemoryRouter>);

        const status = screen.getByText("Activé");
        expect(status).toBeInTheDocument();
        const name = screen.getByText(ingredient.names[0].name);
        expect(name).toBeInTheDocument();
    });
});