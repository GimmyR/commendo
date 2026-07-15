import Dishes from "@/components/dishes";
import { fetchAllDishesWithIngredients, type DishWithIngredients } from "@/libs/actions/dishes";
import { render, screen, waitFor } from "@testing-library/react";

const dish: DishWithIngredients = {
    id: 1,
    active: true,
    price: 3000,
    names: [
        { langId: 1, name: "Poulet roti" }
    ],
    ingredients: []
};

vi.mock('@/libs/actions/dish', () => {
    return {
        fetchAllDishesWithIngredients: vi.fn()
    };
});

describe("Test Dishes", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display dishes", async () => {
        vi.mocked(fetchAllDishesWithIngredients).mockResolvedValue({
            data: [dish],
            pages: 1,
            total: 1
        });

        render(<Dishes/>);
        await waitFor(() => {
            const name = screen.getByText(dish.names[0].name);
            expect(name).toBeInTheDocument();
            const price = screen.getByText(dish.price);
            expect(price).toBeInTheDocument();
        });
    });
});