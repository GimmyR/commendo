import TableItem from "@/components/tables/item";
import type { ITable } from "@/libs/actions/tables";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const table: ITable = {
    id: 1,
    tableRef: "01",
    availability: 1
};

describe("Test TableItem", () => {
    it("Should display table reference", () => {
        render(<MemoryRouter>
            <TableItem table={table}/>
        </MemoryRouter>);
        const tableRef = screen.getByText(table.tableRef);
        expect(tableRef).toBeInTheDocument();
    });
});