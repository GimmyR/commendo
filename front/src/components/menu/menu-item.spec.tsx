import MenuItem from "@/components/menu/menu-item";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const props = {
    to: "#",
    title: "Dishes"
};

describe("Test MenuItem", () => {
    it("Should display title", () => {
        render(<MemoryRouter>
            <MenuItem {...props}/>
        </MemoryRouter>);
        const title = screen.getByText(props.title);
        expect(title).toBeInTheDocument();
    });
});