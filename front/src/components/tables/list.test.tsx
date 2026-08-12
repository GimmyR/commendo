import TablesList from "@/components/tables/list";
import type { ITable } from "@/libs/actions/tables";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const tables: ITable[] = [
    {
        id: 1,
        tableRef: "01",
        availability: 1
    },
    {
        id: 2,
        tableRef: "02",
        availability: 1
    }
];

describe("Test TablesList", () => {
    it("Should display tables list", () => {
        render(<MemoryRouter>
            <TablesList tables={tables}/>
        </MemoryRouter>);
        const ref1 = screen.getByText(tables[0].tableRef);
        expect(ref1).toBeInTheDocument();
        const ref2 = screen.getByText(tables[1].tableRef);
        expect(ref2).toBeInTheDocument();
    });
});