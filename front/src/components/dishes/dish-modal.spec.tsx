import DishModal from "@/components/dishes/dish-modal";
import type { DishWithIngredients } from "@/libs/actions/dishes";
import { render, screen } from "@testing-library/react";

const dish: DishWithIngredients = {
    id: 1,
    active: true,
    price: 3000,
    names: [
        { langId: 1, name: "Poulet roti" }
    ],
    ingredients: [
        {
            quantity: 500,
            ingredient: {
                id: 1,
                active: true,
                unit: "g",
                names: [
                    { langId: 1, name: "Blanc de poulet" }
                ]
            }
        }
    ]
};

const handleHide = () => {};

describe("Test DishModal", () => {
    it("Should display dish and ingredients", () => {
        render(<DishModal dish={dish} show onHide={handleHide}/>);
        const dishName = screen.getByText(dish.names[0].name);
        expect(dishName).toBeInTheDocument();
        const dishPrice = screen.getByText(dish.price);
        expect(dishPrice).toBeInTheDocument();
        const ingrName = screen.getByText(dish.ingredients[0].ingredient.names[0].name);
        expect(ingrName).toBeInTheDocument();
        const ingrQuantity = screen.getByText(`${dish.ingredients[0].quantity} ${dish.ingredients[0].ingredient.unit}`);
        expect(ingrQuantity).toBeInTheDocument();
    });
});