import { fetchAllLanguages, type Language } from "@/libs/actions/language";
import { render, screen, waitFor } from "@testing-library/react";
import "@/i18n";
import { fetchUniqueIngredient, type Ingredient } from "@/libs/actions/ingredients";
import EditIngredientModal from "@/components/ingredients/edit-ingredient-modal";

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

const language: Language = {
    id: 1,
    name: "Français",
    abbrev: "fr"
};

vi.mock("@/libs/actions/language", () => {
    return {
        fetchAllLanguages: vi.fn()
    };
});

vi.mock("@/libs/actions/ingredients", () => {
    return {
        fetchUniqueIngredient: vi.fn()
    };
});

describe("Test EditIngredientModal", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display header, unit, input and submit", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([language]);
        vi.mocked(fetchUniqueIngredient).mockResolvedValue(ingredient);

        render(<EditIngredientModal show={true} onHide={() => {}} ingredientId={1} ingredients={[]}/>);

        await waitFor(() => {
            const header = screen.getByText("Modifier ingrédient");
            expect(header).toBeInTheDocument();
            const unitLabel = screen.getByText("Unité");
            expect(unitLabel).toBeInTheDocument();
            const unitInput = screen.getByPlaceholderText("g");
            expect(unitInput).toBeInTheDocument();
            expect(unitInput).toHaveDisplayValue("g");
            const namesLabel = screen.getByText("Noms");
            expect(namesLabel).toBeInTheDocument();
            const language = screen.getByDisplayValue("Français (fr)")
            expect(language).toBeInTheDocument();
            const input = screen.getByPlaceholderText("Lorem ipsum");
            expect(input).toBeInTheDocument();
            expect(input).toHaveDisplayValue("Riz");
            const submitBtn = screen.getByRole("button", { name: "Enregistrer" });
            expect(submitBtn).toBeInTheDocument();
        });
    });
});