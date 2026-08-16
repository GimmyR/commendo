import MenuBar from "@/components/menu-bar";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@/i18n";

describe("Test MenuBar", () => {
    it("Should display Navigation Links", () => {
        render(<MemoryRouter>
            <MenuBar/>
        </MemoryRouter>);
        const dishes = screen.getByRole("link", { name: "Plats" });
        expect(dishes).toBeInTheDocument();
        const tables = screen.getByRole("link", { name: "Tables" });
        expect(tables).toBeInTheDocument();
        const orders = screen.getByRole("link", { name: "Commandes" });
        expect(orders).toBeInTheDocument();
        const ingredients = screen.getByRole("link", { name: "Ingrédients" });
        expect(ingredients).toBeInTheDocument();
        const inventory = screen.getByRole("link", { name: "Inventaire" });
        expect(inventory).toBeInTheDocument();
        const employees = screen.getByRole("link", { name: "Employés" });
        expect(employees).toBeInTheDocument();
    });
});