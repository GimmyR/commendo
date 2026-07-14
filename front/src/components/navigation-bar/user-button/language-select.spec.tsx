import LanguageSelect from "@/components/navigation-bar/user-button/language-select";
import { fetchAllLanguages, type Language } from "@/libs/actions/language";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("@/libs/actions/language", () => {
    return {
        fetchAllLanguages: vi.fn()
    };
});

const lang: Language = {
    id: 1,
    name: "Français",
    abbrev: "fr"
};

describe("Test LanguageSelect", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display select with options", async () => {
        vi.mocked(fetchAllLanguages).mockResolvedValue([lang]);
        render(<LanguageSelect/>);
        await waitFor(() => {
            const option = screen.getByRole("option", { name: lang.name });
            expect(option).toBeInTheDocument();
        });
    });
});