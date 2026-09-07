import ConfirmModal from "@/components/confirm-modal";
import "@/i18n";
import { render, screen } from "@testing-library/react";

const children = "Vous êtes sür ?";

describe("Test ConfirmModal", () => {
    it("Should display children, 'No' and 'Yes' button", () => {
        render(<ConfirmModal show={true} onCancel={() => {}} onConfirm={() => {}}>
            {children}
        </ConfirmModal>);

        const message = screen.getByText(children);
        expect(message).toBeInTheDocument();
        const noBtn = screen.getByRole("button", { name: "Non" });
        expect(noBtn).toBeInTheDocument();
        const yesBtn = screen.getByRole("button", { name: "Oui" });
        expect(yesBtn).toBeInTheDocument();
    });
});