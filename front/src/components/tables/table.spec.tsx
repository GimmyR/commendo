import TablesTable from "@/components/tables/table";
import type { ITable } from "@/libs/actions/tables";
import { render, screen } from "@testing-library/react";
import "@/i18n";
import { MemoryRouter } from "react-router-dom";

const table: ITable = {
    id: 1,
    tableRef: "01",
    availability: 1
};

describe("Test TablesTable", () => {
    it("Should display table with a row", () => {
        render(<MemoryRouter>
            <TablesTable tables={[table]}/>
        </MemoryRouter>);
        const ref = screen.getByText(table.tableRef);
        expect(ref).toBeInTheDocument();
    });
});