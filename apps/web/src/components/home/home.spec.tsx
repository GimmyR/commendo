import { render, screen } from "@testing-library/react";
import Home from ".";

describe("Test Home component", () => {
    it("Should render button with 'Hello !' as title", () => {
        render(<Home/>);
        const button = screen.getByRole("button", { name: /hello !/i });
        expect(button).toBeInTheDocument();
    });
});
