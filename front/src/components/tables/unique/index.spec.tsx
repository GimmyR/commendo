import UniqueTable from "@/components/tables/unique";
import "@/i18n";
import { fetchUniqueTableByIdWithOrders, type TableWithOrders } from "@/libs/actions/tables";
import { useAuth } from "@/libs/hooks/use-auth";
import { CURRENCY } from "@/libs/utils/constants";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsInJvbGVzIjpbMV0sImlhdCI6MTc4MTgzNjM5MH0.qcg5Nj_xgP8LH1dWItxZIymxfsP1u6GwCVv7MZydSuU";

const table: TableWithOrders = {
    id: 1,
    tableRef: "01",
    availability: 2,
    orders: [
        {
            id: 1,
            status: 0,
            dish: {
                id: 1,
                price: 10000,
                active: true,
                names: [
                    { langId: 1, name: "Poulet roti" }
                ],
                ingredients: []
            }
        }
    ]
};

vi.mock("@/libs/actions/tables", () => {
    return {
        fetchUniqueTableByIdWithOrders: vi.fn()
    }
});

describe("Test UniqueTable", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display table reference", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchUniqueTableByIdWithOrders).mockResolvedValue(table);

        render(<MemoryRouter>
            <UniqueTable/>
        </MemoryRouter>);

        await waitFor(() => {
            const label = screen.getByText("Numéro de table :");
            expect(label).toBeInTheDocument();
            const reference = screen.getByText(table.tableRef);
            expect(reference).toBeInTheDocument();
        });
    });

    it("Should display table orders", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchUniqueTableByIdWithOrders).mockResolvedValue(table);

        render(<MemoryRouter>
            <UniqueTable/>
        </MemoryRouter>);

        await waitFor(() => {
            const dishColumn = screen.getByText("Plat");
            expect(dishColumn).toBeInTheDocument();
            const statusColumn = screen.getByText("Etat");
            expect(statusColumn).toBeInTheDocument();
            const dishName = screen.getByText(table.orders[0].dish.names[0].name);
            expect(dishName).toBeInTheDocument();
            const dishPrices = screen.getAllByText(`${table.orders[0].dish.price} ${CURRENCY.symbol}`);
            expect(dishPrices[0]).toBeInTheDocument();
            const orderStatus = screen.getByText("A confirmer");
            expect(orderStatus).toBeInTheDocument();
        });
    });

    it("Should display book table button", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchUniqueTableByIdWithOrders).mockResolvedValue({...table, availability: 1, orders: []});

        render(<MemoryRouter>
            <UniqueTable/>
        </MemoryRouter>);

        await waitFor(() => {
            const bookTableBtn = screen.getByRole("button", { name: "Réserver" });
            expect(bookTableBtn).toBeInTheDocument();
        });
    });

    it("Should display confirm and free table button", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchUniqueTableByIdWithOrders).mockResolvedValue(table);

        render(<MemoryRouter>
            <UniqueTable/>
        </MemoryRouter>);

        await waitFor(() => {
            const confirmBtn = screen.getByRole("button", { name: "Confirmer" });
            expect(confirmBtn).toBeInTheDocument();
            const freeTableBtn = screen.getByRole("button", { name: "Débarrasser" });
            expect(freeTableBtn).toBeInTheDocument();
        });
    });
});