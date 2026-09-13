import CreateMovementModal from "@/components/inventory/create-movement-modal";
import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import { render, screen, waitFor } from "@testing-library/react";
import "@/i18n";
import type { IngredientMovement } from "@/libs/actions/inventory";

const ingredient: Ingredient = {
    id: 1,
    unit: "g",
    active: true,
    names: [
        {
            langId: 1,
            ingredientId: 1,
            name: "Riz",
            lang: {
                id: 1,
                abbrev: "fr",
                name: "Français"
            }
        }
    ]
};

const movement: IngredientMovement = {
    id: 1,
    ingredientId: 1,
    type: 1,
    quantity: 50000,
    purchasePrice: 175000,
    ingredient
};

vi.mock("@/libs/actions/ingredients", () => {
    return {
        fetchAllIngredients: vi.fn()
    };
});

describe("Test CreateMovementModal", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display 'create-movement' header and form", async () => {
        vi.mocked(fetchAllIngredients).mockResolvedValue([ingredient]);
        render(<CreateMovementModal show={true} onHide={() => {}} create={() => {}} edit={() => {}}/>);

        await waitFor(() => {
            const header = screen.getByText("Créer mouvement");
            expect(header).toBeInTheDocument();
            const selectIngr = screen.getByLabelText("Ingrédient");
            expect(selectIngr).toBeInTheDocument();
            expect(selectIngr).toHaveValue("0");
            const optionIngr = screen.getByText(ingredient.names[0].name);
            expect(optionIngr).toBeInTheDocument();
            const selectType = screen.getByLabelText("Type");
            expect(selectType).toBeInTheDocument();
            expect(selectType).toHaveValue("0");
            const optionTypeIn = screen.getByText("Entrée");
            expect(optionTypeIn).toBeInTheDocument();
            const optionTypeOut = screen.getByText("Sortie");
            expect(optionTypeOut).toBeInTheDocument();
            const quantity = screen.getByLabelText("Quantité (Unité : XXX)");
            expect(quantity).toBeInTheDocument();
            expect(quantity).toHaveValue(0);
            const price = screen.getByLabelText("Prix d'achat (Ar)");
            expect(price).toBeInTheDocument();
            expect(price).toHaveValue(0);
            const submit = screen.getByRole("button", { name: "Enregistrer" });
            expect(submit).toBeInTheDocument();
        });
    });

    it("Should display 'edit-movement' header and form", async () => {
        vi.mocked(fetchAllIngredients).mockResolvedValue([ingredient]);
        render(<CreateMovementModal show={true} movement={movement} onHide={() => {}} create={() => {}} edit={() => {}}/>);

        await waitFor(() => {
            const header = screen.getByText("Modifier mouvement");
            expect(header).toBeInTheDocument();
            const selectIngr = screen.getByLabelText("Ingrédient");
            expect(selectIngr).toBeInTheDocument();
            expect(selectIngr).toHaveValue(movement.ingredient.id.toString());
            const optionIngr = screen.getByText(ingredient.names[0].name);
            expect(optionIngr).toBeInTheDocument();
            const selectType = screen.getByLabelText("Type");
            expect(selectType).toBeInTheDocument();
            expect(selectType).toHaveValue(movement.type.toString());
            const optionTypeIn = screen.getByText("Entrée");
            expect(optionTypeIn).toBeInTheDocument();
            const optionTypeOut = screen.getByText("Sortie");
            expect(optionTypeOut).toBeInTheDocument();
            const quantity = screen.getByLabelText(`Quantité (Unité : ${movement.ingredient.unit})`);
            expect(quantity).toBeInTheDocument();
            expect(quantity).toHaveValue(movement.quantity);
            const price = screen.getByLabelText("Prix d'achat (Ar)");
            expect(price).toBeInTheDocument();
            expect(price).toHaveValue(movement.purchasePrice);
            const submit = screen.getByRole("button", { name: "Enregistrer" });
            expect(submit).toBeInTheDocument();
        });
    });
});