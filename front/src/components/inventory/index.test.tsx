import Inventory from "@/components/inventory";
import { fetchAllMovements, type IngredientMovement } from "@/libs/actions/inventory";
import { render, screen, waitFor } from "@testing-library/react";
import "@/i18n";
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

vi.mock("@/libs/actions/inventory", () => {
    return {
        fetchAllMovements: vi.fn()
    };
});

describe("Test Inventory", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display no data", () => {
        vi.mocked(fetchAllMovements).mockResolvedValue([]);
        render(<Inventory/>);
        const text = screen.getByText("Aucune donnée");
        expect(text).toBeInTheDocument();
        const addMovement = screen.getByRole("button", { name: "Mouvement" });
        expect(addMovement).toBeInTheDocument();
    });

    it("Should display movements", async () => {
        vi.mocked(fetchAllMovements).mockResolvedValue([movement]);

        render(<MemoryRouter>
            <Inventory/>
        </MemoryRouter>);

        await waitFor(() => {
            const ingredient = screen.getByText(movement.ingredient.names[0].name);
            expect(ingredient).toBeInTheDocument();
            const quantity = screen.getByText(`${movement.quantity} ${movement.ingredient.unit}`);
            expect(quantity).toBeInTheDocument();
            const price = screen.getByText(`${movement.purchasePrice} Ar`);
            expect(price).toBeInTheDocument();
            const addMovement = screen.getByRole("button", { name: "Mouvement" });
            expect(addMovement).toBeInTheDocument();
        });
    });
});