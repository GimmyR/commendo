import CreateMovementModal from "@/components/inventory/create-movement-modal";
import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import { render, screen, waitFor } from "@testing-library/react";
import "@/i18n";

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
        render(<CreateMovementModal show={true} onHide={() => {}} create={() => {}}/>);

        await waitFor(() => {
            const header = screen.getByText("Créer mouvement");
            expect(header).toBeInTheDocument();
            const optionIngr = screen.getByText(ingredient.names[0].name);
            expect(optionIngr).toBeInTheDocument();
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
});