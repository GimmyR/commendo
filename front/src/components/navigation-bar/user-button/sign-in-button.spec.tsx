import SignInButton from "@/components/navigation-bar/user-button/sign-in-button";
import { render, screen } from "@testing-library/react";
import "@/i18n";

describe("Test SignInButton", () => {
    it("Should display button with the correct title", () => {
        render(<SignInButton/>);
        const btn = screen.getByRole("button", { name: /connexion/i });
        expect(btn).toBeInTheDocument();
    });
});