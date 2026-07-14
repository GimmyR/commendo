import SignInModal from "@/components/navigation-bar/user-button/sign-in-modal";
import { render, screen } from "@testing-library/react";
import "@/i18n";

describe("Test SignInModal", () => {
    it("Should display title, username input, password input and sign in button", () => {
        render(<SignInModal isShown close={() => {}}/>);
        const title = screen.getByRole("heading", { name: /connexion/i });
        expect(title).toBeInTheDocument();
        const username = screen.getByPlaceholderText("Nom d'utilisateur");
        expect(username).toBeInTheDocument();
        const password = screen.getByPlaceholderText("Mot de passe");
        expect(password).toBeInTheDocument();
        const btn = screen.getByRole("button", { name: /se connecter/i });
        expect(btn).toBeInTheDocument();
    });
});