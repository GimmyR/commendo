import AddIngredientModal from "@/components/ingredients/add-ingredient-modal";
import { fetchAllLanguages, type Language } from "@/libs/actions/language";
import { render, screen, waitFor } from "@testing-library/react";
import "@/i18n";

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

describe("Test AddIngredientModal", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display header, unit, input and submit", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([language]);
        render(<AddIngredientModal show={true} onHide={() => {}} ingredients={[]}/>);

        await waitFor(() => {
            const header = screen.getByText("Ajouter ingrédient");
            expect(header).toBeInTheDocument();
            const unitLabel = screen.getByText("Unité");
            expect(unitLabel).toBeInTheDocument();
            const unitInput = screen.getByPlaceholderText("g");
            expect(unitInput).toBeInTheDocument();
            const namesLabel = screen.getByText("Noms");
            expect(namesLabel).toBeInTheDocument();
            const language = screen.getByDisplayValue("Français (fr)")
            expect(language).toBeInTheDocument();
            const input = screen.getByPlaceholderText("Lorem ipsum");
            expect(input).toBeInTheDocument();
            const submitBtn = screen.getByRole("button", { name: "Enregistrer" });
            expect(submitBtn).toBeInTheDocument();
        });
    });
});