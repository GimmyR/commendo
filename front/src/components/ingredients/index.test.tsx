import Ingredients from "@/components/ingredients";
import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import { fetchAllLanguages, type Language } from "@/libs/actions/language";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const language: Language = {
    id: 1,
    name: "Français",
    abbrev: "fr"
};

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

vi.mock("@/libs/actions/language", () => {
    return {
        fetchAllLanguages: vi.fn()
    };
});

vi.mock("@/libs/actions/ingredients", () => {
    return {
        fetchAllIngredients: vi.fn()
    };
});

describe("Test Ingredients page", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display 'Add ingredient' button", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([language]);
        vi.mocked(fetchAllIngredients).mockResolvedValue([]);
        
        render(<MemoryRouter>
            <Ingredients/>
        </MemoryRouter>);

        await waitFor(() => {
            const addBtn = screen.getByRole("button", { name: "Ajouter ingrédient" });
            expect(addBtn).toBeInTheDocument();
        });
    });

    it("Should display 'No data'", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([language]);
        vi.mocked(fetchAllIngredients).mockResolvedValue([]);
        
        render(<MemoryRouter>
            <Ingredients/>
        </MemoryRouter>);

        await waitFor(() => {
            const noData = screen.getByText("Aucune donnée");
            expect(noData).toBeInTheDocument();
        });
    });

    it("Should display ingredients", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([language]);
        vi.mocked(fetchAllIngredients).mockResolvedValue([ingredient]);
        
        render(<MemoryRouter>
            <Ingredients/>
        </MemoryRouter>);

        await waitFor(() => {
            const status = screen.getByText("Activé");
            expect(status).toBeInTheDocument();
            const name = screen.getByText(ingredient.names[0].name);
            expect(name).toBeInTheDocument();
        });
    });
});