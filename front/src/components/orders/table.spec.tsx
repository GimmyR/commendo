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
        render(<OrdersTable orders={[]}/>);
        const title = screen.getByText("Aucune commande");
        expect(title).toBeInTheDocument();
    });

    it("Should display table of orders", () => {
        render(<OrdersTable orders={[order]}/>);
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
        const orderStatus = screen.getByText("A faire");
        expect(orderStatus).toBeInTheDocument();
    });
});