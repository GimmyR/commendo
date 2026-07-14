import { render, screen } from "@testing-library/react";
import "@/i18n";
import SignOutButton from "@/components/navigation-bar/user-button/sign-out-button";

describe("Test SignOutButton", () => {
    it("Should display button with the correct title", () => {
        render(<SignOutButton/>);
        const btn = screen.getByRole("button", { name: /déconnexion/i });
        expect(btn).toBeInTheDocument();
    });
});