import DishesTable from "@/components/tables/unique/dishes-table";
import "@/i18n";
import type { DishWithIngredients } from "@/libs/actions/dishes";
import { CURRENCY } from "@/libs/utils/constants";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const dish: DishWithIngredients = {
    "id": 1,
    "price": 18000,
    "active": true,
    "names": [
        {
            "langId": 1,
            "name": "Romazava Royal"
        }
    ],
    "ingredients": []
};

describe("Test DishesTable", () => {
    it("Should display table with dishes", () => {
        render(<MemoryRouter>
            <DishesTable dishes={[dish]} addOrder={() => {}}/>
        </MemoryRouter>);
        const nameColumn = screen.getByText("Nom");
        expect(nameColumn).toBeInTheDocument();
        const priceColumn = screen.getByText("Prix");
        expect(priceColumn).toBeInTheDocument();
        const dishName = screen.getByText(dish.names[0].name);
        expect(dishName).toBeInTheDocument();
        const dishPrice = screen.getByText(`${dish.price} ${CURRENCY.symbol}`);
        expect(dishPrice).toBeInTheDocument();
    });
});