import SelectOrderStatus from "@/components/orders/select-order-status";
import "@/i18n";
import { render, screen } from "@testing-library/react";

describe("Test SelectOrderStatus", () => {
    it("Should display select with all states", () => {
        render(<SelectOrderStatus orderId={1} current={2} changeStatus={vi.fn()}/>);
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