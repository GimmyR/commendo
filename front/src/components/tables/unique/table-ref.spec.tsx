import TableRef from "@/components/tables/unique/table-ref";
import "@/i18n";
import { render, screen } from "@testing-library/react";

const ref = "A01";

describe("Test TableRef", () => {
    it("Should display table reference", () => {
        render(<TableRef reference={ref}/>);
        const label = screen.getByText("Numéro de table :");
        expect(label).toBeInTheDocument();
        const reference = screen.getByText(ref);
        expect(reference).toBeInTheDocument();
    });
});