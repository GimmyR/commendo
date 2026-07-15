import type { Order } from "@/libs/actions/orders";
import { useTranslation } from "react-i18next";

type Props = {
    orders: Order[];
};

export default function OrdersTable({ orders } : Props) {
    const {t} = useTranslation("ordersTable");

    if(orders.length == 0)
        return <div className="text-center border mb-4" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
            <strong className="align-middle text-uppercase">{t("noOrders")}</strong>
        </div>;

    return (
        <div>Table</div>
    );
}