import OtherOrdersButton from "@/components/orders/other-orders-button";
import { render, screen } from "@testing-library/react";

describe("Test OtherOrdersButton", () => {
    it("Should display button title", () => {
        render(<OtherOrdersButton/>);
        const btn = screen.getByRole("button", { name: "Voir autres" });
        expect(btn).toBeInTheDocument();
    });
});