import LargeSearchButton from "@/components/navigation-bar/large-search-button";
import { render, screen } from "@testing-library/react";
import "@/i18n";

describe("Test LargeSearchButton", () => {
    it("Should display search button with title", () => {
        render(<LargeSearchButton onClick={() => {}}/>);
        const btn = screen.getByRole("button", { name: /rechercher/i });
        expect(btn).toBeInTheDocument();
    });
});