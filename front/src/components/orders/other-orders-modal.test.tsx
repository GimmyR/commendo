import OtherOrdersModal from "@/components/orders/other-orders-modal";
import { fetchOtherOrders } from "@/libs/actions/orders";
import { useAuth } from "@/libs/hooks/use-auth";
import { render, screen, waitFor } from "@testing-library/react";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsInJvbGVzIjpbMV0sImlhdCI6MTc4MTgzNjM5MH0.qcg5Nj_xgP8LH1dWItxZIymxfsP1u6GwCVv7MZydSuU";

const order = {
    "id": 6,
    "dishId": 4,
    "tableId": 1,
    "status": 5,
    "table": {
        "id": 1,
        "tableRef": "01",
        "availability": 1
    },
    "dish": {
        "id": 4,
        "price": 28000,
        "image": "dish-4.jpg",
        "active": true,
        "names": [
            {
                "dishId": 4,
                "langId": 1,
                "name": "Camaron Sauce Tomate",
                "active": true
            }
        ],
        "ingredients": []
    }
};

vi.mock("@/libs/actions/orders", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@/libs/actions/orders")>();
    return {
        ...actual,
        fetchOtherOrders: vi.fn()
    }
});

describe("Test OtherOrdersModal", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display table of other orders", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchOtherOrders).mockResolvedValue([order]);
        render(<OtherOrdersModal show={true} onHide={() => {}}/>);

        await waitFor(() => {
            const tableRef = screen.getByText("01");
            expect(tableRef).toBeInTheDocument();
            const dish = screen.getByText(order.dish.names[0].name);
            expect(dish).toBeInTheDocument();
            const status = screen.getByText("Archivée");
            expect(status).toBeInTheDocument();
        });
    });
});