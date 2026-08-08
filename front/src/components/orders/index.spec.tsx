import Orders from "@/components/orders";
import "@/i18n";
import { fetchAllCurrentOrders, type OrderWithTableAndDish } from "@/libs/actions/orders";
import { useAuth } from "@/libs/hooks/use-auth";
import { render, screen, waitFor } from "@testing-library/react";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsInJvbGVzIjpbMV0sImlhdCI6MTc4MTgzNjM5MH0.qcg5Nj_xgP8LH1dWItxZIymxfsP1u6GwCVv7MZydSuU";

const order: OrderWithTableAndDish = {
    id: 1,
    status: 1,
    table: {
        id: 1,
        tableRef: "01",
        availability: 2
    },
    dish: {
        id: 1,
        price: 10000,
        active: true,
        names: [
            {
                langId: 1,
                name: "Poulet roti"
            }
        ],
        ingredients: []
    }
};

vi.mock("@/libs/actions/orders", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/libs/actions/orders")>();
    return {
        ...actual,
        fetchAllCurrentOrders: vi.fn()
    };
});

describe("Test Orders", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display columns (to do, in progress and done), one order and 'See others' button", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchAllCurrentOrders).mockResolvedValue([order]);
        render(<Orders/>);

        await waitFor(() => {
            const toDoColumn = screen.getByRole("heading", { name: "A faire" });
            expect(toDoColumn).toBeInTheDocument();
            const inProgressColumn = screen.getByRole("heading", { name: "En préparation" });
            expect(inProgressColumn).toBeInTheDocument();
            const doneColumn = screen.getByRole("heading", { name: "Terminée" });
            expect(doneColumn).toBeInTheDocument();
            const tableRef = screen.getByText(order.table.tableRef);
            expect(tableRef).toBeInTheDocument();
            const dishName = screen.getByText(order.dish.names[0].name);
            expect(dishName).toBeInTheDocument();
            const btn = screen.getByRole("button", { name: "Voir autres" });
            expect(btn).toBeInTheDocument();
        });
    });
});