import OrdersColumn from "@/components/orders/orders-column";
import { render, screen } from "@testing-library/react";
import "@/i18n";

const order = {
    "id": 6,
    "dishId": 4,
    "tableId": 1,
    "status": 1,
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

const status = { key: "to-do", color: "primary" };

describe("Test OrdersColumn", () => {
    it("Should display column title and one order", () => {
        render(<OrdersColumn group="1" status={status} orders={[order]} target={undefined}/>);
        const columnTitle = screen.getByRole("heading", { name: "A faire" });
        expect(columnTitle).toBeInTheDocument();
        const tableRef = screen.getByText(order.table.tableRef);
        expect(tableRef).toBeInTheDocument();
        const dishName = screen.getByText(order.dish.names[0].name);
        expect(dishName).toBeInTheDocument();
    });
});