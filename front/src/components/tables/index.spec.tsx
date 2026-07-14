import Tables from "@/components/tables";
import { fetchAllTables, type ITable } from "@/libs/actions/tables";
import { useAuth } from "@/libs/hooks/use-auth";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/libs/actions/tables", () => {
    return {
        fetchAllTables: vi.fn()
    };
});

const table: ITable = {
    id: 1,
    tableRef: "01",
    availability: 1
};

describe("Test Tables", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("Should display table with a row", async () => {
        useAuth.getState().login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsInJvbGVzIjpbMV0sImlhdCI6MTc4MTgzNjM5MH0.qcg5Nj_xgP8LH1dWItxZIymxfsP1u6GwCVv7MZydSuU");
        vi.mocked(fetchAllTables).mockResolvedValue([table]);
        render(<MemoryRouter>
            <Tables/>
        </MemoryRouter>);

        await waitFor(() => {
            const ref = screen.getByText(table.tableRef);
            expect(ref).toBeInTheDocument();
        });
    });
});