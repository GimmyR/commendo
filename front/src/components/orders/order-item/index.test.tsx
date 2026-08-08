import OrderItem from "@/components/orders/order-item";
import { render, screen } from "@testing-library/react";

const order = {
    "id": 6,
    "dishId": 4,
    "tableId": 1,
    "status": 3,
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

describe("Test OrderItem", () => {
    it("Should display table reference and dish name", () => {
        render(<OrderItem order={order} index={0} group="1"/>);
        const tableRef = screen.getByText(order.table.tableRef);
        expect(tableRef).toBeInTheDocument();
        const dishName = screen.getByText(order.dish.names[0].name);
        expect(dishName).toBeInTheDocument();
    });
});