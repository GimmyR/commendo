import MovementsList from "@/components/inventory/list";
import { render, screen } from "@testing-library/react";
import "@/i18n";
import type { IngredientMovement } from "@/libs/actions/inventory";
import { MemoryRouter } from "react-router-dom";

const movement: IngredientMovement = {
    id: 1,
    ingredientId: 1,
    type: 1,
    quantity: 50000,
    purchasePrice: 175000,
    ingredient: {
        id: 1,
        unit: "g",
        active: true,
        names: [
            {
                ingredientId: 1,
                langId: 2,
                lang: {
                    id: 1,
                    name: "Français",
                    abbrev: "fr"
                },
                name: "Riz"
            }
        ]
    }
};

describe("Test MovementsList", () => {
    it("Should display no data", () => {
        render(<MovementsList movements={[]}/>);
        const text = screen.getByText("Aucune donnée");
        expect(text).toBeInTheDocument();
    });

    it("Should display movements", () => {
        render(<MemoryRouter>
            <MovementsList movements={[movement]}/>
        </MemoryRouter>);
        const ingredient = screen.getByText(movement.ingredient.names[0].name);
        expect(ingredient).toBeInTheDocument();
        const quantity = screen.getByText(`${movement.quantity} ${movement.ingredient.unit}`);
        expect(quantity).toBeInTheDocument();
        const price = screen.getByText(`${movement.purchasePrice} Ar`);
        expect(price).toBeInTheDocument();
    });
});