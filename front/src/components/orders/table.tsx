import SelectOrderStatus from "@/components/orders/select-order-status";
import { type OrderWithTableAndDish } from "@/libs/actions/orders";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    orders: OrderWithTableAndDish[];
    changeStatus: (orderId: number, status: number) => void;
};

export default function OrdersTable({ orders, changeStatus } : Props) {
    const {t} = useTranslation(["orders", "table"]);

    if(orders.length == 0)
        return <div className="text-center border mb-4" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
            <strong className="align-middle text-uppercase">{t("orders:no-orders")}</strong>
        </div>;

    return (
        <Table>
            <thead>
                <tr>
                    <th className="d-none d-lg-table-cell">ID</th>
                    <th className="text-center">Table</th>
                    <th>{t("orders:dish")}</th>
                    <th>{t("orders:status")}</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => <tr key={order.id} className="align-middle">
                    <td className="d-none d-lg-table-cell">{order.id}</td>
                    <td className="text-center">{order.table.tableRef}</td>
                    <td>{order.dish.names[0].name}</td>
                    <td>
                        <SelectOrderStatus orderId={order.id} current={order.status} changeStatus={changeStatus}/>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
}