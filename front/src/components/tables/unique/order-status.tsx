import { orderStates } from "@/libs/actions/orders";
import { useTranslation } from "react-i18next";

type Props = {
    status: number;
};

export default function OrderStatus({ status } : Props) {
    const {t} = useTranslation("orders");

    return (
        <strong className={`px-2 py-1 text-bg-${orderStates[status].color}`}>
            {t(orderStates[status].key)}
        </strong>
    );
}