import Pages from "@/components/pagination";
import { createRange } from "@/libs/utils/array";
import { render, screen } from "@testing-library/react";

const props = {
    pages: 5,
    current: 2,
    setCurrent: (page: number) => {
        console.log(page);
    }
};

describe("Test Pages", () => {
    it("Should display pages", () => {
        render(<Pages {...props}/>);

        for(const nb of createRange(1, props.pages)) {
            const page = screen.getByText(nb);
            expect(page).toBeInTheDocument();
        }
    });
});