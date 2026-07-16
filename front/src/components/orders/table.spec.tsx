import OrdersTable from "@/components/orders/table";
import "@/i18n";
import type { OrderWithTableAndDish } from "@/libs/actions/orders";
import { render, screen } from "@testing-library/react";

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

describe("Test OrdersTable", () => {
    it("Should not display table of orders", () => {
        render(<OrdersTable orders={[]} changeStatus={vi.fn()}/>);
        const title = screen.getByText("Aucune commande");
        expect(title).toBeInTheDocument();
    });

    it("Should display table of orders", () => {
        render(<OrdersTable orders={[order]} changeStatus={vi.fn()}/>);
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

    it("Should display select with all states", () => {
        render(<OrdersTable orders={[order]} changeStatus={vi.fn()}/>);
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