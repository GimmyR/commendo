import DishesModal from "@/components/tables/unique/dishes-modal";
import "@/i18n";
import { fetchAllDishesWithIngredients, type DishWithIngredients } from "@/libs/actions/dishes";
import { CURRENCY } from "@/libs/utils/constants";
import { render, screen, waitFor } from "@testing-library/react";
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

vi.mock("@/libs/actions/dishes", () => {
    return {
        fetchAllDishesWithIngredients: vi.fn()
    };
});

describe("Test DishesModal", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display header", () => {
        vi.mocked(fetchAllDishesWithIngredients).mockResolvedValue([dish]);
        
        render(<MemoryRouter>
            <DishesModal show orders={[]} addOrder={() => {}} onHide={() => {}}/>
        </MemoryRouter>);

        const header = screen.getByText("Choisir des plats");
        expect(header).toBeInTheDocument();
    });

    it("Should display table with dishes", async () => {
        vi.mocked(fetchAllDishesWithIngredients).mockResolvedValue({
            data: [dish],
            pages: 1,
            total: 1
        });
        
        render(<MemoryRouter>
            <DishesModal show orders={[]} addOrder={() => {}} onHide={() => {}}/>
        </MemoryRouter>);

        await waitFor(() => {
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
});