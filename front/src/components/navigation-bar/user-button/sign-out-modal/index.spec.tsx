import SignOutModal from "@/components/navigation-bar/user-button/sign-out-modal";
import { render, screen } from "@testing-library/react";
import "@/i18n";

describe("Test SignOutModal", () => {
    it("Should display message, cancel button and confirm button", () => {
        render(<SignOutModal isShown close={() => {}}/>);
        const message = screen.getByText("Tu es sûr de vouloir te déconnecter ?");
        expect(message).toBeInTheDocument();
        const cancel = screen.getByRole("button", { name: /annuler/i });
        expect(cancel).toBeInTheDocument();
        const confirm = screen.getByRole("button", { name: /confirmer/i });
        expect(confirm).toBeInTheDocument();
    });
});