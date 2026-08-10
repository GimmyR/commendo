import TableItem from "@/components/tables/item";
import type { ITable } from "@/libs/actions/tables";
import { Stack } from "react-bootstrap";

type Props = {
    tables: ITable[]
};

export default function TablesList({ tables } : Props) {
    return (
        <Stack direction="horizontal" className="flex-wrap justify-content-center justify-content-sm-start pt-5 pt-sm-0 pb-5">
            {tables.map(table => <TableItem key={table.id} table={table}/>)}
        </Stack>
    );
}