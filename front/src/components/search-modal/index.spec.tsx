import SearchModal from "@/components/search-modal";
import { useSearch } from "@/libs/hooks/use-search";
import { render, screen } from "@testing-library/react";

const props = {
    header: "Greetings",
    children: "Hello world"
};

describe("Test SearchModal", () => {
    it("Should display header and children", () => {
        useSearch.getState().setShow(true);
        render(<SearchModal {...props}/>);
        const header = screen.getByText(props.header);
        expect(header).toBeInTheDocument();
        const children = screen.getByText(props.children);
        expect(children).toBeInTheDocument();
    });
});