import OrderStatus from "@/components/tables/unique/order-status";
import "@/i18n";
import { render, screen } from "@testing-library/react";

describe("Test OrderStatus", () => {
    it("Should display order status", () => {
        render(<OrderStatus status={2}/>);
        const status = screen.getByText("En préparation");
        expect(status).toBeInTheDocument();
    });
});