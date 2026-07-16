import TableOrdersTable from "@/components/tables/unique/orders-table";
import "@/i18n";
import type { Order } from "@/libs/actions/orders";
import { CURRENCY } from "@/libs/utils/constants";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const order: Order ={ 
    id: 1, 
    dish: { 
        id: 1, 
        names: [ { langId: 1, name: "Poulet roti" } ],
        price: 10000,
        active: true,
        ingredients: []
    }, 
    status: 0
};

describe("Test TableOrdersTable", () => {
    it("Should not display table", () => {
        render(<TableOrdersTable orders={[]} addOrder={() => {}} deleteOrder={() => {}}/>);
        const title = screen.getByText("Aucune commande");
        expect(title).toBeInTheDocument();
    });

    it("Should display table of orders", () => {
        render(<MemoryRouter>
            <TableOrdersTable orders={[order]} addOrder={() => {}} deleteOrder={() => {}}/>
        </MemoryRouter>);
        const dishColumn = screen.getByText("Plat");
        expect(dishColumn).toBeInTheDocument();
        const statusColumn = screen.getByText("Etat");
        expect(statusColumn).toBeInTheDocument();
        const dishName = screen.getByText(order.dish.names[0].name);
        expect(dishName).toBeInTheDocument();
        const dishPrices = screen.getAllByText(`${order.dish.price} ${CURRENCY.symbol}`);
        expect(dishPrices[0]).toBeInTheDocument();
        const orderStatus = screen.getByText("A confirmer");
        expect(orderStatus).toBeInTheDocument();
    });
});