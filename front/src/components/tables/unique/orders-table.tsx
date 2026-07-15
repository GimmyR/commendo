import OrderStatus from "@/components/tables/unique/order-status";
import type { DishWithIngredients } from "@/libs/actions/dishes";
import { calculateOrdersTotal, type Order } from "@/libs/actions/orders";
import { CURRENCY } from "@/libs/utils/constants";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
    orders: Order[];
    addOrder: (dish: DishWithIngredients) => void;
    deleteOrder: (order: Order) => void;
};

export default function OrdersTable({ orders, addOrder, deleteOrder } : Props) {
    const {t} = useTranslation("table");

    if(orders.length == 0)
        return <div className="text-center border mb-4" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
            <strong className="align-middle text-uppercase">{t("noOrders")}</strong>
        </div>;

    return (
        <Table>
            <thead>
                <tr>
                    <th>{t("dish")}</th>
                    <th className="col-5 col-lg-2 text-center">{t("status")}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => <tr key={order.id ? `saved-${index}` : `unsaved-${index}`} className="align-middle">
                    <td className="d-flex flex-column">
                        <span>{order.dish?.names[0].name}</span>
                        <span className="text-secondary" style={{ fontSize: "15px" }}>{order.dish?.price} {CURRENCY.symbol}</span>
                    </td>
                    <td className="text-center">
                        <OrderStatus status={order.status ?? 0}/>
                    </td>
                    <th className="text-center">
                        <Link onClick={() => addOrder(order.dish)} to="#" className="text-success">
                            <i className="bi bi-plus-lg"></i>
                        </Link>
                    </th>
                    <th className="text-center">
                        <Link onClick={() => deleteOrder(order)} to="#" className="text-success">
                            <i className="bi bi-trash"></i>
                        </Link>
                    </th>
                </tr>)}
                <tr>
                    <th>TOTAL</th>
                    <td colSpan={3} className="text-end">
                        {calculateOrdersTotal(orders)} {CURRENCY.symbol}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}