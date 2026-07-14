import Menu from "@/components/menu";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@/i18n";

const options = [ "Plats", "Tables", "Ingrédients", "Inventaire", "Employés" ];

describe("Test Menu", () => {
    it("Should display menu options", () => {
        render(<MemoryRouter>
            <Menu show onHide={() => {}}/>
        </MemoryRouter>);

        for(const option of options) {
            const title = screen.getByText(option);
            expect(title).toBeInTheDocument();
        }
    });
});