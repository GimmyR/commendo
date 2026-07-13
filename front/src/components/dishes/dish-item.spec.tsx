import DishItem from "@/components/dishes/dish-item";
import type { DishWithIngredients } from "@/libs/actions/dish";
import { render, screen } from "@testing-library/react";

const dish: DishWithIngredients = {
    id: 1,
    active: true,
    price: 3000,
    names: [
        { langId: 1, name: "Poulet roti" }
    ],
    ingredients: []
};

const handleClick = () => {};

describe("Test DishItem", () => {
    it("Should display dish informations", () => {
        render(<DishItem dish={dish} onClick={handleClick}/>);
        const name = screen.getByText(dish.names[0].name);
        expect(name).toBeInTheDocument();
        const price = screen.getByText(dish.price);
        expect(price).toBeInTheDocument();
    });
});