import Orders from "@/components/orders";
import "@/i18n";
import { fetchAllOrders, type OrderWithTableAndDish } from "@/libs/actions/orders";
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
        fetchAllOrders: vi.fn()
    };
});

describe("Test Orders", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display current orders and others title", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchAllOrders).mockResolvedValue([]);
        render(<Orders/>);

        await waitFor(() => {
            const h1 = screen.getByRole("heading", { name: "Commandes courantes" });
            expect(h1).toBeInTheDocument();
            const others = screen.getByText("Autres commandes");
            expect(others).toBeInTheDocument();
        });
    });

    it("Should not display table of orders", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchAllOrders).mockResolvedValue([]);
        render(<Orders/>);

        await waitFor(() => {
            const titles = screen.getAllByText("Aucune commande");
            expect(titles[0]).toBeInTheDocument();
        });
    });

    it("Should display table of orders", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchAllOrders).mockResolvedValue([order]);
        render(<Orders/>);

        await waitFor(() => {
            const tableColumn = screen.getByText("Table");
            expect(tableColumn).toBeInTheDocument();
            const dishColumn = screen.getByText("Plat");
            expect(dishColumn).toBeInTheDocument();
            const statusColumn = screen.getByText("Etat");
            expect(statusColumn).toBeInTheDocument();
            const tableRef = screen.getByText(order.table.tableRef);
            expect(tableRef).toBeInTheDocument();
            const dishName = screen.getByText(order.dish.names[0].name);
            expect(dishName).toBeInTheDocument();
        });
    });
    
    it("Should display select with all states", async () => {
        useAuth.getState().login(accessToken);
        vi.mocked(fetchAllOrders).mockResolvedValue([order]);
        render(<Orders/>);

        await waitFor(() => {
            const status1 = screen.getByText("A confirmer");
            expect(status1).toBeInTheDocument();
            const status2 = screen.getByText("A faire");
            expect(status2).toBeInTheDocument();
            const status3 = screen.getByText("En préparation");
            expect(status3).toBeInTheDocument();
            const status4 = screen.getByText("Terminée");
            expect(status4).toBeInTheDocument();
            const status5 = screen.getByText("Annulée");
            expect(status5).toBeInTheDocument();
            const status6 = screen.getByText("Archivée");
            expect(status6).toBeInTheDocument();
        });
    });
});