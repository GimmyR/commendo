import AvailabilityIcon from "@/components/tables/availability-icon";
import type { ITable } from "@/libs/actions/tables";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
    tables: ITable[]
};

export default function TablesTable({ tables } : Props) {
    const {t} = useTranslation("tables");

    return (
        <Table className="text-center">
            <thead>
                <tr>
                    <th className="d-none d-lg-table-cell">ID</th>
                    <th>
                        <span className="d-none d-lg-inline">{t("tableRef")}</span>
                        <span className="d-inline d-lg-none">{t("tableRef-small")}</span>
                    </th>
                    <th>{t("availability")}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tables.map(table => <tr key={table.id}>
                    <td className="d-none d-lg-table-cell">{table.id}</td>
                    <td>{table.tableRef}</td>
                    <td>
                        <AvailabilityIcon availability={table.availability}/>
                    </td>
                    <td>
                        <Link to={`/tables/${table.id}`} className="text-success">
                            <i className="bi bi-clipboard"></i>
                        </Link>
                    </td>
                    <td>
                        <Link to="#" className="text-success">
                            <i className="bi bi-archive"></i>
                        </Link>
                    </td>
                    <td>
                        <Link to="#" className="text-success">
                            <i className="bi bi-trash"></i>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
}